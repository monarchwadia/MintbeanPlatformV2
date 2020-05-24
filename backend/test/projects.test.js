const supertest = require("supertest");
const app = require("../src/app");
// const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
// const userCreated = require('./stories/user.created');
const userFactory = require('../src/db/factories/user.factory');
const mbEventFactory = require('../src/db/factories/mb-event.factory');
const projectFactory = require('../src/db/factories/project.factory');
const { User, MbEvent, Project } = require('../src/db/models');

let agent = null;

describe("Projects model", () => {
  let user;
  let mbEvent;
  let project;

  beforeEach(async (done) => {
    try {
      user = await User.create(userFactory.one());
      mbEvent = await MbEvent.create(mbEventFactory.one());
      const projectPayload = projectFactory.one();
      projectPayload.UserId = user.id;
      projectPayload.MbEventId = mbEvent.id;
      project = await Project.create(projectPayload);
      done();
    } catch (e) {
      done(e);
    }
  });
  
  afterEach(async (done) => {
    try {
      await Project.destroy({where: {}});
      await User.destroy({where: {}});
      await MbEvent.destroy({where: {}});
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Can be created with associations', async () => {
    const user = await project.getUser();
    const event = await project.getMbEvent();
    expect(project.id).toBeTruthy();
    expect(user).toBeTruthy();
    expect(event).toBeTruthy();
  })
});
