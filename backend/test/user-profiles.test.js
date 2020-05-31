const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require('../src/db/factories/user.factory');
const mbEventFactory = require('../src/db/factories/mb-event.factory');
const projectFactory = require('../src/db/factories/project.factory');
const { User, MbEvent, Project } = require('../src/db/models');

describe("User profiles route", () => {
  let user;
  let mbEvent;
  let project;


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

  let agent = null;

  describe("Get Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD }));
        mbEvent = await MbEvent.create(mbEventFactory.one());
        const projectPayload = projectFactory.one({
          UserId: user.id,
          MbEventId: mbEvent.id
        });
        
        project = await Project.create(projectPayload);
        done();
      } catch (e) {
        done(e);
      }
    })
  
    afterEach(async done => {
      try {
        await Project.destroy({where: {}});
        await User.destroy({where: {}});
        await MbEvent.destroy({where: {}});
        done();
      } catch (e) {
        done(e);
      }
    });

    it('needs to be logged in', async done => {
      // fetch while not logged in
      const response = await agent
        .get("/api/v1/user-profile/" + user.id);
  
      expect(response.statusCode).toBe(401);
  
      done()
    });

    describe("When logged in", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        
        done();
      });

      it('can get a user profile', async done => {
        // fetch while logged in
        const response = await agent
          .get("/api/v1/user-profile/" + user.id);
    
        expect(response.statusCode).toBe(200);
        
        const userProfile = response.body;

        expect(userProfile).toBeTruthy();
        expect(userProfile.id).toBe(user.id);

        expect(userProfile.Projects.length).toBe(1);
        const userProfileProject = userProfile.Projects[0];
        expect(userProfileProject.id).toBe(project.id);

        const userProfileProjectEvent = userProfileProject.MbEvent;
        expect(userProfileProjectEvent).toBeTruthy();
        expect(userProfileProjectEvent.id).toBe(mbEvent.id);
        done();
      });

    });
  })
})