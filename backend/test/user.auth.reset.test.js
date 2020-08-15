import supertest from "supertest";
import app from "../src/app";
import { TEST_EMAIL, TEST_PASSWORD, TEST_ADMIN_EMAIL } from "./test.constants";
import userFactory from "../src/db/factories/user.factory";
import { User } from "../src/db/models";
import sgMail from "@sendgrid/mail";
import { parse } from "node-html-parser";
import { btoa } from "./test.util";
import encryption from "../src/utils/encryption";

const ABSURD_EMAIL = "iswearthisaddressisntinthedatabase@noway.io";

let agent = null;
let user;

const clear = async done => {
  jest.clearAllMocks();
  await User.destroy({ where: {} });
  user = undefined;

  done();
};

describe("User auth reset routes", () => {
  beforeEach(async done => {
    let msgObj;
    // mock sendGrid mailer
    const mockSendResetTokenLink = jest.spyOn(sgMail, "send");
    mockSendResetTokenLink.mockImplementation(args => {
      msgObj = args;
      return Promise.resolve();
    });
    agent = supertest.agent(app);
    done();
  });

  afterEach(async done => {
    clear(done);
    jest.clearAllMocks();
    done();
  });

  describe("POST /auth/reset", () => {
    describe("when invalid email requested", () => {
      it("returns ambiguous status 200 ", async done => {
        const ABSURD_EMAIL = "iswearthisaddressisntinthedatabase@noway.io";
        const response = await agent
          .post("/api/v1/auth/reset")
          .send({ email: ABSURD_EMAIL });

        expect(response.body).toMatchObject({});
        expect(response.statusCode).toBe(200);

        done();
      });
      // TODO: if user email invalid, should not send SendMail email
    });
    describe("when valid email requested", () => {
      beforeEach(async done => {
        user = await User.create(
          userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
        );
        done();
      });

      afterEach(async done => {
        await User.destroy({ where: {} });
        clear(done);
        jest.clearAllMocks();
      });

      it("assigns reset_token and reset_token_created_at on user", async done => {
        const response = await agent
          .post("/api/v1/auth/reset")
          .send({ email: user.email });

        // re-fetch user with given email
        user = await User.findOne({ where: { email: user.email } });

        expect(response.body).toMatchObject({});
        expect(response.statusCode).toBe(200);
        expect(user.reset_token).toBeTruthy();
        expect(user.reset_token_created_at).toBeTruthy();
        expect(typeof user.reset_token).toBe("string");
        expect(new Date(user.reset_token_created_at.toString())).toBeTruthy();

        done();
      });

      it("updates reset_token and reset_token_created_at on user on subsequent requests", async done => {
        let msgObj;
        // mock sendGrid mailer
        const mockSendResetTokenLink = jest.spyOn(sgMail, "send");
        mockSendResetTokenLink.mockImplementation(args => {
          msgObj = args;
          return Promise.resolve();
        });
        // first token reset req
        await agent.post("/api/v1/auth/reset").send({ email: user.email });

        let userSnapshot1;
        let userSnapshot2;

        // snapshot of user on first reset
        try {
          userSnapshot1 = await User.findOne({
            where: { email: user.email }
          });
        } catch (e) {
          console.log(e);
        }

        // second token reset req on same user
        const response = await agent
          .post("/api/v1/auth/reset")
          .send({ email: user.email });

        // snapshot of user on second reset
        try {
          userSnapshot2 = await User.findOne({
            where: { email: user.email }
          });
        } catch (e) {
          console.log(e);
        }

        expect(response.body).toMatchObject({});
        expect(response.statusCode).toBe(200);
        expect(userSnapshot2.reset_token).toBeTruthy();
        expect(userSnapshot2.reset_token_created_at).toBeTruthy();
        expect(typeof userSnapshot2.reset_token).toBe("string");
        expect(
          new Date(userSnapshot2.dataValues.reset_token_created_at.toString())
        ).toBeTruthy();
        expect(
          new Date(
            userSnapshot2.dataValues.reset_token_created_at.toString()
          ) >=
            new Date(userSnapshot1.dataValues.reset_token_created_at.toString())
        ).toBeTruthy();
        expect(userSnapshot2.dataValues.reset_token).not.toMatch(
          userSnapshot1.dataValues.reset_token
        );

        done();
      });

      // TODO: why is below seemingly randomly failing sometimes
      it("sends and email to user containing valid tokenized link to password reset", async done => {
        let msgObj;
        // mock sendGrid mailer
        const mockSendResetTokenLink = jest.spyOn(sgMail, "send");
        mockSendResetTokenLink.mockImplementation(args => {
          msgObj = args;
          return Promise.resolve();
        });

        const response = await agent
          .post("/api/v1/auth/reset")
          .send({ email: user.email });
        try {
          user = await User.findOne({
            where: { email: user.email }
          });
        } catch (e) {
          console.log(e);
        }
        const msgHTML = msgObj.html;
        const resetLinkButton = parse(msgHTML).querySelector("#btn_reset_link");
        const hrefAttr = resetLinkButton.getAttribute("href");
        const tokenObj = btoa(hrefAttr.split("/").pop());

        // console.log(resetLinkButton);
        expect(resetLinkButton).toBeTruthy();
        expect(msgObj.to).toMatch(user.email);
        expect(await encryption.compare(tokenObj.token, user.reset_token)).toBe(
          true
        );
        done();
      });
    });
  });

  describe("POST /auth/reset/check-token", () => {
    beforeEach(async done => {
      let msgObj;
      // mock sendGrid mailer
      const mockSendResetTokenLink = jest.spyOn(sgMail, "send");
      mockSendResetTokenLink.mockImplementation(args => {
        msgObj = args;
        return Promise.resolve();
      });

      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );
      const base_response = await agent
        .post("/api/v1/auth/reset")
        .send({ email: user.email });

      user = await User.findOne({
        where: { email: user.email }
      });
      // TODO: get uuid and save it to test user
      // user.test_uuid_token = base_response.body;
      done();
    });

    afterEach(async done => {
      await User.destroy({ where: {} });
      jest.clearAllMocks();
      clear(done);
    });

    describe("when req uses invalid email", () => {
      it("returns 401 status with vague error", async done => {
        const response = await agent
          .post("/api/v1/auth/reset/check-token")
          .send({
            tokenObj: {
              email: ABSURD_EMAIL,
              token: user.dataValues.reset_token
            }
          });

        expect(response.statusCode).toBe(401);
        expect(response.body.err).toMatch("Invalid or expired token.");

        done();
      });
    });
    describe("when req uses valid email but invalid token", () => {
      it("returns 401 status with vague error", async done => {
        const response = await agent
          .post("/api/v1/auth/reset/check-token")
          .send({
            tokenObj: {
              email: TEST_EMAIL,
              token: "faketoken123"
            }
          });

        expect(response.statusCode).toBe(401);
        expect(response.body.err).toMatch("Invalid or expired token.");

        done();
      });
    });
    // describe.only("when req uses valid email and token", () => {
    //   it("returns status 200 and an email that matches user's email", async done => {
    //     console.log(user.dataValues.reset_token);
    //     console.log(user.dataValues.reset_token_created_at);
    //     // convert token to uuidv4
    //     const response = await agent
    //       .post("/api/v1/auth/reset/check-token")
    //       .send({
    //         tokenObj: {
    //           email: user.dataValues.email,
    //           token: user.dataValues.reset_token // <- TODO: this must be raw uuid - figure out how to get
    //         }
    //       });
    //
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.email).toBeTruthy();
    //     expect(response.body.email).toMatch(user.dataValues.email);
    //
    //     done();
    //   });
    // });
  });

  describe("POST /auth/reset/new-password", () => {
    const NEW_PASSWORD = "new_password";

    beforeEach(async done => {
      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );

      // set reset token
      await agent.post("/api/v1/auth/reset").send({ email: user.email });

      // re-fetch user with token
      user = await User.findOne({
        where: { email: user.email }
      });

      done();
    });

    afterEach(async done => {
      await User.destroy({ where: {} });
      jest.clearAllMocks();
      clear(done);
    });

    // describe("when req uses invalid email", () => {
    //   it("returns status 403 with 'Invalid token' err", async done => {
    //     const response = await agent.post("/api/v1/auth/new-password").send({
    //       tokenObj: {
    //         email: user.email,
    //         password: NEW_PASSWORD,
    //         token: user.reset_token // <- TODO: this must be raw uuid token, won't work like this
    //       }
    //     });
    //
    //     expect(response.statusCode).toBe(403);
    //     expect(response.body.err).toMatch("Invalid token");
    //
    //     done();
    //   });
    // });

    describe("when req uses invalid token", () => {
      it("returns status 403 with 'Invalid token' err", async done => {
        const response = await agent
          .post("/api/v1/auth/reset/new-password")
          .send({
            tokenObj: {
              email: user.email,
              password: NEW_PASSWORD,
              token: "i'm an invalid token"
            }
          });

        // expect(response.statusCode).toBe(403);
        expect(response.body.err).toMatch("Invalid token");

        done();
      });
    });

    // describe("when req uses valid token", () => {
    //   it("returns status 200 and reset_token fields are nullified on user", async done => {
    //     const response = await agent
    //       .post("/api/v1/auth/reset/new-password")
    //       .send({
    //         tokenObj: {
    //           email: user.email,
    //           password: NEW_PASSWORD,
    //           token: user.reset_token // <- TODO: this must be raw uuid token, won't work like this
    //         }
    //       });
    //
    //     expect(response.statusCode).toBe(200);

    // expect password = new password
    // expect reset_token = null
    // expect reset_token_created_at = null
    //
    //   done();
    // });
    // });
  });
});
