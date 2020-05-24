const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userCreated = require('./stories/user.created');

let agent = null;

describe("Test the root path", () => {
  beforeEach(done => {
    agent = supertest.agent(app);
    userCreated.beforeEach(done);
  });

  afterEach(done => {
    userCreated.afterEach(done);
  });

  test("It should authenticate", async () => {
    const loginResponse = await agent
      .post("/api/v1/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD })

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.email).toBe(TEST_EMAIL);
    expect(loginResponse.body.password).toBeFalsy();

    const selfResponse = await agent
      .get("/api/v1/auth/self")
      .send();

    expect(selfResponse.statusCode).toBe(200);
    expect(selfResponse.body.email).toBe(TEST_EMAIL);
    expect(loginResponse.body.password).toBeFalsy();

    const logoutResponse = await agent
      .post("/api/v1/auth/logout")
      .send();
    
    expect(logoutResponse.statusCode).toBe(200);

    const selfResponseAfterLogout = await agent
    .get("/api/v1/auth/self")
    .send();

    expect(selfResponseAfterLogout.statusCode).toBe(401);
  });

  test("It should fail authentication with the wrong password", async () => {
    const response = await agent
    .post("/api/v1/auth/login")
    .send({ email: TEST_EMAIL, password: 'wrong-password' });

    expect(response.statusCode).toBe(401);
  });
});