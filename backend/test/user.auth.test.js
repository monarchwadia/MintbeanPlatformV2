const supertest = require("supertest");
const app = require("../src/app");
const { User } = require('../src/db/models');
const userFactory = require('../src/db/factories/user.factory');

const TEST_EMAIL = 'test@mintbean.io';
const TEST_PASSWORD = 'password';

let agent = null;

describe("Test the root path", () => {
  beforeEach(done => {
    agent = supertest.agent(app);

    User.create(userFactory.one({
      email: TEST_EMAIL,
      password_hash: TEST_PASSWORD
    })).then(result => done())
    .catch(err => {
      console.dir(err);
      done(err)
    });
  });

  afterEach(done => {
    // delete all users
    User.destroy({ where: {}})
      .then(result => done())
      .catch(err => {
        console.dir(err);
        done(err);
      })
  });

  test("It should authenticate", async () => {
    const loginResponse = await agent
      .post("/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD })

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.email).toBe(TEST_EMAIL);
    expect(loginResponse.body.password).toBeFalsy();

    const selfResponse = await agent
      .get("/auth/self")
      .send();

    expect(selfResponse.statusCode).toBe(200);
    expect(selfResponse.body.email).toBe(TEST_EMAIL);
    expect(loginResponse.body.password).toBeFalsy();

    const logoutResponse = await agent
      .post("/auth/logout")
      .send();
    
    expect(logoutResponse.statusCode).toBe(200);

    const selfResponseAfterLogout = await agent
    .get("/auth/self")
    .send();

    console.log(selfResponseAfterLogout.body);

    expect(selfResponseAfterLogout.statusCode).toBe(401);
  });

  test("It should fail authentication with the wrong password", async () => {
    const response = await agent
    .post("/auth/login")
    .send({ email: TEST_EMAIL, password: 'wrong-password' });

    expect(response.statusCode).toBe(401);
  });
});