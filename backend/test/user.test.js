const request = require("supertest");
const app = require("../src/app");
const { User } = require('../src/db/models');
const userFactory = require('../src/db/factories/user.factory');

const TEST_EMAIL = 'test@mintbean.io';
const TEST_PASSWORD = 'password';

describe("Test the root path", () => {
  beforeEach(done => {
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

  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to the Mintbean Platform API');
  });

  test("It should authenticate", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(response.statusCode).toBe(200);
  });

  test("It should fail authentication with the wrong password", async () => {
    const response = await request(app)
    .post("/auth/login")
    .send({ email: TEST_EMAIL, password: 'wrong-password' });

    expect(response.statusCode).toBe(401);
  });

  // test("It should get the username from the user route", async () => {
  //   const response = await request(app).get("/user");
  //   console.log("Response body", response.body)
  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.username).toBe('username')
  // })
});