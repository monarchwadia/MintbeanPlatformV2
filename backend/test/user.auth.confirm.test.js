const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require("../src/db/factories/user.factory");
const { User } = require("../src/db/models");
const { v4: uuidv4 } = require("uuid");
const { hash, compare } = require("../src/utils/encryption");

let agent = null;
let user;

const clear = async done => {
  await User.destroy({ where: {} });
  user = undefined;
  done();
};

describe("User auth confirm routes", () => {
  beforeEach(async done => {
    agent = supertest.agent(app);
    done();
  });

  afterEach(async done => {
    clear(done);
    done();
  });

  describe("POST /auth/confirm", () => {
    describe("when unconfirmed user makes req to /auth/confirm with accurate token", () => {
      beforeEach(async done => {
        const uuid = uuidv4();
        const hashedToken = await hash(uuid);
        user = await User.create(
          userFactory.one({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
            confirmation_token: hashedToken
          })
        );
        user.uuid = uuid; // attach this extra to carry for testing
        done();
      });
      afterEach(async done => {
        clear(done);
        done();
      });

      it("user.confirmed set to true, and user.confirmation_token set to nullified", async done => {
        const response = await agent
          .post("/api/v1/auth/confirm")
          .send({ email: user.email, token: user.uuid });

        // re-fetch user with given email
        const updatedUser = await User.findOne({
          where: { email: user.email }
        });
        expect(response.statusCode).toBe(200);
        expect(updatedUser.confirmed).toBe(true);
        expect(updatedUser.confirmation_token).toBe(null);

        done();
      });
    });

    describe("when already confirmed user makes req to /auth/confirm with accurate token", () => {
      beforeEach(async done => {
        user = await User.create(
          userFactory.one({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
            confirmation_token: null,
            confirmed: true
          })
        );
        done();
      });
      afterEach(async done => {
        clear(done);
        done();
      });

      it("responds status 200 with { type: 'already-confirmed' }", async done => {
        const response = await agent
          .post("/api/v1/auth/confirm")
          .send({ email: user.email, token: "whocareswhatthisis" });

        // re-fetch user with given email
        const updatedUser = await User.findOne({
          where: { email: user.email }
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.type).toMatch("already-confirmed");
        expect(updatedUser.confirmed).toBe(true);
        expect(updatedUser.confirmation_token).toBe(null);

        done();
      });
    });
    describe("when invalid token requested", () => {
      beforeEach(async done => {
        const hashedToken = await hash(uuidv4());
        user = await User.create(
          userFactory.one({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
            confirmation_token: hashedToken,
            confirmed: false
          })
        );

        done();
      });
      afterEach(async done => {
        clear(done);
        done();
      });

      it("responds status 422 with { type: 'already-confirmed' }", async done => {
        const response = await agent
          .post("/api/v1/auth/confirm")
          .send({ email: user.email, token: "whocareswhatthisis" });

        // re-fetch user with given email
        const refetchedUser = await User.findOne({
          where: { email: user.email }
        });
        expect(response.statusCode).toBe(422);
        expect(refetchedUser.confirmed).toBe(false);

        done();
      });
    });
  });
});
