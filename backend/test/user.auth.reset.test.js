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
  agent = undefined;
  done();
};

describe("User auth reset routes", () => {
  // TODO: auth/reset redirects home if logged in (how? no http request)
  describe("POST /auth/reset", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );
      done();
    });

    afterEach(async done => {
      clear(done);
      done();
    });

    // if user email invalid, expect ambiguous 200 res
    // if user email invalid, should not send SendMail email
    it("returns ambiguous status 200 if invalid email requested", async done => {
      const invalidEmail = "iswearthisaddressisntinthedatabase@noway.io";
      const response = await agent
        .post("/api/v1/auth/reset")
        .send({ email: invalidEmail });

      expect(response.body).toMatchObject({});
      expect(response.statusCode).toBe(200);

      done();
    });
    // if user exists, expect reset_token and reset_token_created_at to update on user
    // if user already had token, expect token to be overwritten
  });

  // POST /reset/check-token
  // POST /reset/new-password
});
