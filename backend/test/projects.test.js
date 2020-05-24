const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require('../src/db/factories/user.factory');
const mbEventFactory = require('../src/db/factories/mb-event.factory');
const projectFactory = require('../src/db/factories/project.factory');
const { User, MbEvent, Project } = require('../src/db/models');

describe("Projects model", () => {
  let user;
  let mbEvent;
  let project;

  beforeEach(async (done) => {
    try {
      user = await User.create(userFactory.one());
      mbEvent = await MbEvent.create(mbEventFactory.one());
      const projectPayload = projectFactory.one(); // TODO: fix the id's
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

describe("Projects route", () => {
  let agent = null;

  
  describe("Get Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD }));
        mbEvent = await MbEvent.create(mbEventFactory.one());
        const projectPayload = projectFactory.one();
        projectPayload.UserId = user.id;
        projectPayload.MbEventId = mbEvent.id;
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
        .get("/api/v1/project");
  
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

      it('can get all of the projects of a logged-in user', async done => {
        // fetch while not logged in
        const response = await agent
          .get("/api/v1/project");
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].id).toBe(project.id);
    
        done();
      });

      // it('can get all of the projects of a logged-in user', async done => {
      //   // fetch while not logged in
      //   const response = await agent
      //     .get("/api/v1/project");
    
      //   expect(response.statusCode).toBe(200);
      //   expect(response.body.length).toBe(1);
      //   expect(response.body[0].id).toBe(project.id);
    
      //   done();
      // })
    });
  })

  describe("CREATE Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD }));
        mbEvent = await MbEvent.create(mbEventFactory.one());
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
      // create while not logged in
      const projectPayload = projectFactory.one();
      projectPayload.UserId = user.id;
      projectPayload.MbEventId = mbEvent.id;

      const response = await agent
        .post("/api/v1/project")
        .send(projectPayload);
  
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

      it('can create a project for the logged-in user', async done => {
        // create while logged in
        // const projectPayload = projectFactory.one();
                // title: Joi.string().required(),
        // source_code_url: Joi.string().uri().required(),
        // live_url: Joi.string().uri().required(),
        // MbEventId: Joi.string().uuid().required()
        const projectPayload = {
          title: 'testproject',
          source_code_url: 'https://google.com',
          live_url: 'https://google.com',
          MbEventId: mbEvent.id
        }

        const response = await agent
          .post("/api/v1/project")
          .send(projectPayload);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.MbEventId).toBe(mbEvent.id);
        expect(response.body.UserId).toBe(user.id);
    
        done();
      });
    });
  })
})