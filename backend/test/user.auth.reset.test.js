const supertest = require("supertest");
const app = require("../src/app");
const {
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_ADMIN_EMAIL
} = require("./test.constants");
const userFactory = require("../src/db/factories/user.factory");
const { User } = require("../src/db/models");
const mailer = require("../src/services/mailerService");
const sgMail = require("@sendgrid/mail");
// const { base64ToObj } = require("./test.util");

const ABSURD_EMAIL = "iswearthisaddressisntinthedatabase@noway.io";

let agent = null;
let user;

const clear = async done => {
  await User.destroy({ where: {} });
  user = undefined;
  done();
};

describe("User auth reset routes", () => {
  beforeEach(async done => {
    agent = supertest.agent(app);
    done();
  });

  afterEach(async done => {
    clear(done);
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

      it.only("sends and email to user containing tokenized link to password reset", async done => {
        // mock sendGrid mailer
        const mockSendResetTokenLink = jest.spyOn(sgMail, "send");
        mockSendResetTokenLink.mockImplementationOnce(args => {
          console.log(args);
          return Promise.reject("Monarch threw this.");
        });

        // mockSendToken({ email: user.email, isSandbox: true });
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
        const mockedReturn = await mockSendResetTokenLink.mock.results[0].value;
        console.log(mockedReturn);
        console.log(mockSendResetTokenLink.mock.calls.length);

        // const mockSendgrid = jest
        //   .spyOn(sendgrid, "send")
        //   .mockImplementation(args => {
        //     console.log(this);
        //   });
        // mailData = {
        //   to: user.email,
        //   from: TEST_ADMIN_EMAIL,
        //   subject: "Reset your Mintbean password",
        //   html: `
        //   <p>Hello,</p>
        //   <p>A password reset was requested for the Mintbean account with this email address.</p>
        //   <p>Please click the link below to reset your password.</p>
        //   <a href="https://mintbean.io/auth/reset/dfskdjhfkdjshkj">Create a new password</a>
        //   `
        // };
        // mockSendgrid(mailData);
        // console.log(mockSendgrid.mock.results);
        // console.log(mockSendgrid.mock.calls[0]);
        done();
      });
    });
  });

  describe("POST /auth/reset/check-token", () => {
    beforeEach(async done => {
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

        expect(response.statusCode).toBe(403);
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
