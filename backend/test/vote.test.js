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

describe("Projects route", () => {
  let agent = null;
  
  describe("Vote route", () => {
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
        await Vote.destroy({ where: {} })
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
        .post("/api/v1/vote");
  
      expect(response.statusCode).toBe(401);
  
      done()
    });


    describe("When logged in", () => {
      beforeEach(async done => {
        const response = await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        
        expect(response.body.email).toBe(TEST_EMAIL);
        done();
      });

      it('creates the vote', async done => {
        const RATING = 1;
        const COMMENT = 'testing';

        const response = await agent
          .post('/api/v1/vote')
          .send({
            ProjectId: project.id,
            rating: 1,
            comment: 'testing'
          });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.ProjectId).toBe(project.id);
        expect(response.body.UserId).toBe(user.id);
        expect(response.body.rating).toBe(RATING);
        expect(response.body.comment).toBe(COMMENT);
        
        done();
      });

      it('requires the ProjectId', async done => {
        const response = await agent
          .post('/api/v1/vote')
          .send({
            ProjectId: null,
            rating: 1,
            comment: 'testing'
          });
        
        expect(response.statusCode).toBe(400);
        
        done();
      });

      it('requires the rating to be greater than 1', async done => {
        const response = await agent
          .post('/api/v1/vote')
          .send({
            ProjectId: null,
            rating: 0,
            comment: 'testing'
          });
        
        expect(response.statusCode).toBe(400);
        
        done();
      });

      it('requires the rating to be <= 10', async done => {
        const response = await agent
          .post('/api/v1/vote')
          .send({
            ProjectId: null,
            rating: 11,
            comment: 'testing'
          });
        
        expect(response.statusCode).toBe(400);
        
        done();
      });

      it('allows upserts on votes', async done => {
        const voteCount0 = await Vote.count({ where: {
          ProjectId: project.id,
          UserId: user.id
        }})

        expect(voteCount0).toBe(0);

        const firstResponse = await agent
        .post('/api/v1/vote')
        .send({
          ProjectId: project.id,
          rating: 1,
          comment: 'testing1'
        });
      
        expect(firstResponse.statusCode).toBe(200);
        const createdAt = firstResponse.body.createdAt;
        const updatedAt = firstResponse.body.updatedAt;

        const voteCount1 = await Vote.count({ where: {
          ProjectId: project.id,
          UserId: user.id
        }})

        expect(voteCount1).toBe(1);
      
        const NEW_RATING = 2;
        const NEW_COMMENT = 'testing2';

        const secondResponse = await agent
          .post('/api/v1/vote')
          .send({
            ProjectId: project.id,
            rating: NEW_RATING,
            comment: NEW_COMMENT
          });
        
        expect(secondResponse.statusCode).toBe(200);
        // expect(secondResponse.body.createdAt).toBe(createdAt);
        // expect(secondResponse.body.updatedAt).not.toBe(updatedAt);
        expect(secondResponse.body.rating).toBe(NEW_RATING);
        expect(secondResponse.body.comment).toBe(NEW_COMMENT);

        const voteCount2 = await Vote.count({ where: {
          ProjectId: project.id,
          UserId: user.id
        }})

        expect(voteCount2).toBe(1);
        
        done();
      });
    });
  });
});