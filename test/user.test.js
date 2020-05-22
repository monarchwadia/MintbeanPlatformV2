const request = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('hello world');
  });

  test("It should authenticate", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: 'username', password: 'password' });
    console.log("Response body", response.body)
    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe('username')
  })

  // test("It should get the username from the user route", async () => {
  //   const response = await request(app).get("/user");
  //   console.log("Response body", response.body)
  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.username).toBe('username')
  // })
});