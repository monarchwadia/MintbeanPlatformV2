const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require('../src/db/factories/user.factory');
const mbEventFactory = require('../src/db/factories/mb-event.factory');
const projectFactory = require('../src/db/factories/project.factory');
const voteFactory = require('../src/db/factories/vote.factory');
const { User, MbEvent, Project, Vote } = require('../src/db/models');

describe("Votes model", () => {
  let user;
  let mbEvent;
  let project;
  let vote;

  beforeEach(async (done) => {
    try {
      user = await User.create(userFactory.one());
      mbEvent = await MbEvent.create(mbEventFactory.one());
      project = await Project.create(projectFactory.one({
        UserId: user.id,
        MbEventId: mbEvent.id
      }));
      vote = await Vote.create(voteFactory.one({
        ProjectId: project.id,
        UserId: user.id
      }));

      done();
    } catch (e) {
      done(e);
    }
  });
  
  afterEach(async (done) => {
    try {
      await Vote.destroy({ where: {} })
      await Project.destroy({where: {}});
      await User.destroy({where: {}});
      await MbEvent.destroy({where: {}});
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Can be created with associations', () => {
    expect(vote.comment).toBeTruthy();
    expect(vote.rating).toBeTruthy();
  });

  it('Will create multiple votes for the same project', async () => {
    const users = await User.bulkCreate(userFactory.bulk(10));
    for (u in users) {
      await Vote.create(voteFactory.one({
        UserId: u.id,
        ProjectId: project.id
      }));
    }
  })

  it('Will create multiple votes for the same user', async () => {
    const projects = await Project.bulkCreate(projectFactory.bulk(10));
    for (p in projects) {
      await Vote.create(voteFactory.one({
        UserId: user.id,
        ProjectId: p.id
      }));
    }
  });

  it('Will not let the same user vote for the same project', async () => {
    let error = null;

    try {
      await Vote.create(voteFactory.one({
        UserId: user.id,
        ProjectId: project.id
      }));
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe("SequelizeUniqueConstraintError");
    expect(error.errors.find(e => e.path === "UserId")).toBeTruthy();
    expect(error.errors.find(e => e.path === "ProjectId")).toBeTruthy();
  })
});

// describe("Projects route", () => {
//   let agent = null;

  
//   describe("Get Project route", () => {
//     beforeEach(async done => {
//       agent = supertest.agent(app);
//       try {
//         user = await User.create(userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD }));
//         mbEvent = await MbEvent.create(mbEventFactory.one());
//         const projectPayload = projectFactory.one({
//           UserId: user.id,
//           MbEventId: mbEvent.id
//         });
        
//         project = await Project.create(projectPayload);
//         done();
//       } catch (e) {
//         done(e);
//       }
//     })
  
//     afterEach(async done => {
//       try {
//         await Project.destroy({where: {}});
//         await User.destroy({where: {}});
//         await MbEvent.destroy({where: {}});
//         done();
//       } catch (e) {
//         done(e);
//       }
//     });
//     it('needs to be logged in', async done => {
//       // fetch while not logged in
//       const response = await agent
//         .get("/api/v1/project");
  
//       expect(response.statusCode).toBe(401);
  
//       done()
//     });

//     describe("When logged in", () => {
//       beforeEach(async done => {
//         await agent
//           .post("/api/v1/auth/login")
//           .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        
//         done();
//       });

//       it('can get all of the projects of a logged-in user', async done => {
//         // fetch while logged in
//         const response = await agent
//           .get("/api/v1/project");
    
//         expect(response.statusCode).toBe(200);
//         expect(response.body.length).toBe(1);
//         expect(response.body[0].id).toBe(project.id);
    
//         done();
//       });

//       // it('can get all of the projects of a logged-in user', async done => {
//       //   // fetch while not logged in
//       //   const response = await agent
//       //     .get("/api/v1/project");
    
//       //   expect(response.statusCode).toBe(200);
//       //   expect(response.body.length).toBe(1);
//       //   expect(response.body[0].id).toBe(project.id);
    
//       //   done();
//       // })
//     });
//   })

//   describe("CREATE Project route", () => {
//     beforeEach(async done => {
//       agent = supertest.agent(app);
//       try {
//         user = await User.create(userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD }));
//         mbEvent = await MbEvent.create(mbEventFactory.one());
//         done();
//       } catch (e) {
//         done(e);
//       }
//     })
  
//     afterEach(async done => {
//       try {
//         await Project.destroy({where: {}});
//         await User.destroy({where: {}});
//         await MbEvent.destroy({where: {}});
//         done();
//       } catch (e) {
//         done(e);
//       }
//     });

//     it('needs to be logged in', async done => {
//       // create while not logged in
//       const projectPayload = projectFactory.one({
//         UserId: user.id,
//         MbEventId: mbEvent.id
//       });

//       const response = await agent
//         .post("/api/v1/project")
//         .send(projectPayload);
  
//       expect(response.statusCode).toBe(401);
  
//       done()
//     });

//     describe("When logged in", () => {
//       beforeEach(async done => {
//         await agent
//           .post("/api/v1/auth/login")
//           .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        
//         done();
//       });

//       it('can create a project for the logged-in user', async done => {
//         // create while logged in
//         // const projectPayload = projectFactory.one();
//                 // title: Joi.string().required(),
//         // source_code_url: Joi.string().uri().required(),
//         // live_url: Joi.string().uri().required(),
//         // MbEventId: Joi.string().uuid().required()
//         const projectPayload = {
//           title: 'testproject',
//           source_code_url: 'https://google.com',
//           live_url: 'https://google.com',
//           MbEventId: mbEvent.id
//         }

//         const response = await agent
//           .post("/api/v1/project")
//           .send(projectPayload);
    
//         expect(response.statusCode).toBe(200);
//         expect(response.body.MbEventId).toBe(mbEvent.id);
//         expect(response.body.UserId).toBe(user.id);
    
//         done();
//       });

//       it('can create and update a project for the logged-in user', async done => {
//         // GET BEFORE CREATE SHOULD BE EMPTY
//         const beforeResponse = await agent
//           .get("/api/v1/project");
    
//         expect(beforeResponse.statusCode).toBe(200);
//         expect(beforeResponse.body.length).toBe(0);
    
//         // CREATE
//         const projectPayload = {
//           title: 'testproject',
//           source_code_url: 'https://google.com',
//           live_url: 'https://google.com',
//           MbEventId: mbEvent.id
//         }

//         const createResponse = await agent
//           .post("/api/v1/project")
//           .send(projectPayload);
    
//         expect(createResponse.statusCode).toBe(200);
//         expect(createResponse.body.MbEventId).toBe(mbEvent.id);
//         expect(createResponse.body.UserId).toBe(user.id);
//         expect(createResponse.body.MbEvent.id).toBe(mbEvent.id);
//         expect(createResponse.body.User.id).toBe(user.id);

//         // GET AFTER CREATE SHOULD HAVE THE OBJECT
//         const afterResponse = await agent
//         .get("/api/v1/project");
  
//         expect(afterResponse.statusCode).toBe(200);
//         expect(afterResponse.body.length).toBe(1);
//         expect(afterResponse.body[0].id).toBe(createResponse.body.id);
//         expect(afterResponse.body[0].MbEventId).toBe(mbEvent.id);
//         expect(afterResponse.body[0].UserId).toBe(user.id);

//         done();
//       });
//     });
//   })
// })