const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require("../src/db/factories/user.factory");
const { User } = require("../src/db/models");

let agent = null;
let user;

const clear = async done => {
  await User.destroy({ where: {} });
  user = undefined;
  done();
};

describe("User auth reset routes", () => {
  // TODO: auth/reset redirects home if logged in (how? no http request)
  describe("POST /auth/reset", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      done();
    });

    afterEach(async done => {
      clear(done);
      done();
    });

    describe("when invalid email requested", () => {
      // if user email invalid, expect ambiguous 200 res
      it("returns ambiguous status 200 ", async done => {
        const invalidEmail = "iswearthisaddressisntinthedatabase@noway.io";
        const response = await agent
          .post("/api/v1/auth/reset")
          .send({ email: invalidEmail });

        expect(response.body).toMatchObject({});
        expect(response.statusCode).toBe(200);

        done();
      });
      // if user email invalid, should not send SendMail email
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
        const response1 = await agent
          .post("/api/v1/auth/reset")
          .send({ email: user.email });

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

        // request second reset token on same user
        const response2 = await agent
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

        expect(response2.body).toMatchObject({});
        expect(response2.statusCode).toBe(200);
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
    });
  });

  // POST /reset/check-token
  // POST /reset/new-password
});
