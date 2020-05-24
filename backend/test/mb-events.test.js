const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userCreated = require('./stories/user.created');
const mbEventFactory = require('../src/db/factories/mb-event.factory');
const { MbEvent } = require('../src/db/models');

let agent = null;

describe("MbEvents route", () => {
  beforeEach(done => {
    agent = supertest.agent(app);
    MbEvent.bulkCreate(mbEventFactory.bulk(10))
      .then(() => done())
      .catch(done);
  });

  afterEach(done => {
    MbEvent.destroy({where: {}}).then(() => done()).catch(done);
  });

  test("It should fetch all the events", async () => {
    const response = await agent
    .get("/api/v1/mb-event");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(10);
  });
});