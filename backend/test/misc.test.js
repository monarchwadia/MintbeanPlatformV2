const request = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", async done => {
    const response = await request(app).get("/api/v1");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to the Mintbean Platform API');
    done();
  });
});