const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require("../src/db/factories/user.factory");
const mbEventFactory = require("../src/db/factories/mb-event.factory");
const projectFactory = require("../src/db/factories/project.factory");
const voteFactory = require("../src/db/factories/vote.factory");
const {
  User,
  MbEvent,
  Project,
  MediaAsset,
  ProjectMediaAsset,
  Vote
} = require("../src/db/models");

let user;
let mbEvent;
let project;

const clear = async done => {
  await Vote.destroy({ where: {} });
  await ProjectMediaAsset.destroy({ where: {} });
  await MediaAsset.destroy({ where: {} });
  await Project.destroy({ where: {} });
  await User.destroy({ where: {} });
  await MbEvent.destroy({ where: {} });
  user = undefined;
  mbEvent = undefined;
  project = undefined;
  done();
};

describe("Projects model", () => {
  beforeAll(done => {
    clear(done);
  });

  afterAll(async done => {
    clear(done);
  });

  beforeEach(async done => {
    user = await User.create(userFactory.one());
    mbEvent = await MbEvent.create(mbEventFactory.one());
    const projectPayload = projectFactory.one({
      UserId: user.id,
      MbEventId: mbEvent.id
    });

    project = await Project.create(projectPayload);
    done();
  });

  afterEach(async done => {
    clear(done);
  });

  it("Can be created with associations", async done => {
    const user = await project.getUser();
    const event = await project.getMbEvent();
    expect(project.id).toBeTruthy();
    expect(user).toBeTruthy();
    expect(event).toBeTruthy();

    done();
  });
});

describe("Projects route", () => {
  let agent = null;

  describe("Get Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );
      mbEvent = await MbEvent.create(mbEventFactory.one());
      const projectPayload = projectFactory.one({
        UserId: user.id,
        MbEventId: mbEvent.id
      });

      project = await Project.create(projectPayload);

      done();
    });

    afterEach(async done => {
      clear(done);
    });

    it("needs to be logged in", async done => {
      // fetch while not logged in
      const response = await agent.get("/api/v1/project");

      expect(response.statusCode).toBe(401);

      done();
    });

    describe("When logged in", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

        done();
      });

      it("can get all of the projects of a logged-in user", async done => {
        // fetch while logged in
        const response = await agent.get("/api/v1/project");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].id).toBe(project.id);

        done();
      });

      it("does not return projects that do not belong to the user", async done => {
        const otherUser = await User.create(userFactory.one());
        await Project.create(projectFactory.one({ UserId: otherUser.id }));

        // fetch while logged in
        const response = await agent.get("/api/v1/project");

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
  });

  describe("Search Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );
      mbEvent = await MbEvent.create(mbEventFactory.one());
      const projectPayload = projectFactory.one({
        UserId: user.id,
        MbEventId: mbEvent.id
      });

      project = await Project.create(projectPayload);
      done();
    });

    afterEach(async done => {
      clear(done);
    });

    it("Can sort rating average descending", async done => {
      // clear projects
      await Project.destroy({ where: { id: project.id } });
      const voter = await User.create(userFactory.one());
      const projects = await Project.bulkCreate(
        projectFactory.bulk(4, {
          UserId: user.id,
          title: (obj, i) => `Project ${i}`
        })
      );

      await Vote.bulkCreate(
        voteFactory.bulk(4, {
          UserId: voter.id,
          ProjectId: (obj, i) => {
            return projects[i].id;
          },
          rating: (obj, i) => i
        })
      );

      // fetch while logged in
      const response = await agent.get(
        "/api/v1/project/search?sort_field=RATING_AVERAGE&sort_direction=desc"
      );

      expect(response.body.length).toBe(4);
      expect(response.body[0].ratingAverage).toBe(3);
      expect(response.body[1].ratingAverage).toBe(2);
      expect(response.body[2].ratingAverage).toBe(1);
      expect(response.body[3].ratingAverage).toBe(0);

      done();
    });

    it("sorts rating average descending by default", async done => {
      // clear projects
      await Project.destroy({ where: { id: project.id } });
      const voter = await User.create(userFactory.one());
      const projects = await Project.bulkCreate(
        projectFactory.bulk(4, {
          UserId: user.id,
          title: (obj, i) => `Project ${i}`
        })
      );

      await Vote.bulkCreate(
        voteFactory.bulk(4, {
          UserId: voter.id,
          ProjectId: (obj, i) => {
            return projects[i].id;
          },
          rating: (obj, i) => i
        })
      );

      // fetch while logged in
      const response = await agent.get("/api/v1/project/search");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(4);
      expect(response.body[0].ratingAverage).toBe(3);
      expect(response.body[1].ratingAverage).toBe(2);
      expect(response.body[2].ratingAverage).toBe(1);
      expect(response.body[3].ratingAverage).toBe(0);

      done();
    });

    it("Can sort rating average ascending", async done => {
      // clear projects
      await Project.destroy({ where: { id: project.id } });
      const voter = await User.create(userFactory.one());
      const projects = await Project.bulkCreate(
        projectFactory.bulk(4, {
          UserId: user.id,
          title: (obj, i) => `Project ${i}`
        })
      );

      await Vote.bulkCreate(
        voteFactory.bulk(4, {
          UserId: voter.id,
          ProjectId: (obj, i) => {
            return projects[i].id;
          },
          rating: (obj, i) => 10 - i
        })
      );

      // fetch while logged in
      const response = await agent.get(
        "/api/v1/project/search?sort_field=RATING_AVERAGE&sort_direction=asc"
      );

      expect(response.body.length).toBe(4);
      expect(response.body[0].ratingAverage).toBe(7);
      expect(response.body[1].ratingAverage).toBe(8);
      expect(response.body[2].ratingAverage).toBe(9);
      expect(response.body[3].ratingAverage).toBe(10);

      done();
    });

    it("can filter by user id", async done => {
      // clear projects
      await Project.destroy({ where: { id: project.id } });

      const createUserWithProject = async () => {
        const thisUser = await User.create(userFactory.one());
        await Project.create(
          projectFactory.one({
            UserId: thisUser.id
          })
        );
        return thisUser;
      };

      const doTest = async theUser => {
        // fetch while logged in
        const response = await agent.get(
          `/api/v1/project/search?filter_userId=${theUser.id}`
        );
        expect(response.body.length).toBe(1);
        expect(response.body[0].user_fullname).toBe(
          theUser.firstname + " " + theUser.lastname
        );
      };

      const user1 = await createUserWithProject();
      const user2 = await createUserWithProject();
      const user3 = await createUserWithProject();
      const user4 = await createUserWithProject();

      await doTest(user1);
      await doTest(user2);
      await doTest(user3);
      await doTest(user4);

      done();
    });

    it("can filter by MbEvent ID", async done => {
      // clear projects
      await Project.destroy({ where: { id: project.id } });
      await MbEvent.destroy({ where: { id: mbEvent.id } });

      const fooMbEvent = await MbEvent.create(mbEventFactory.one());
      const fooProject = await Project.create(
        projectFactory.one({
          UserId: user.id,
          MbEventId: fooMbEvent.id
        })
      );

      const barMbEvent = await MbEvent.create(mbEventFactory.one());
      const barProject = await Project.create(
        projectFactory.one({
          UserId: user.id,
          MbEventId: barMbEvent.id
        })
      );

      const bazMbEvent = await MbEvent.create(mbEventFactory.one());
      const bazProject = await Project.create(
        projectFactory.one({
          UserId: user.id,
          MbEventId: bazMbEvent.id
        })
      );

      const doTest = async mbEvent => {
        // fetch while logged in
        const response = await agent.get(
          `/api/v1/project/search?filter_mbEventId=${mbEvent.id}`
        );
        expect(response.body.length).toBe(1);
        expect(response.body[0].mbevent_cover_image_url).toBe(
          mbEvent.cover_image_url
        );
      };

      await doTest(fooMbEvent);
      await doTest(barMbEvent);
      await doTest(bazMbEvent);

      done();
    });
  });

  describe("CREATE Project route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      user = await User.create(
        userFactory.one({ email: TEST_EMAIL, password: TEST_PASSWORD })
      );
      mbEvent = await MbEvent.create(mbEventFactory.one());
      done();
    });

    afterEach(async done => {
      clear(done);
    });

    it("needs to be logged in", async done => {
      // create while not logged in
      const projectPayload = projectFactory.one({
        UserId: user.id,
        MbEventId: mbEvent.id
      });

      const response = await agent.post("/api/v1/project").send(projectPayload);

      expect(response.statusCode).toBe(401);

      done();
    });

    describe("When logged in", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

        done();
      });

      it("can create a project for the logged-in user", async done => {
        // create while logged in
        // const projectPayload = projectFactory.one();
        // title: Joi.string().required(),
        // source_code_url: Joi.string().uri().required(),
        // live_url: Joi.string().uri().required(),
        // MbEventId: Joi.string().uuid().required()
        const projectPayload = {
          title: "testproject",
          source_code_url: "https://google.com",
          live_url: "https://google.com",
          MbEventId: mbEvent.id,
          MediaAssets: [{ cloudinaryPublicId: "abcd1234" }]
        };

        const response = await agent
          .post("/api/v1/project")
          .send(projectPayload);

        expect(response.statusCode).toBe(200);
        expect(response.body.MbEventId).toBe(mbEvent.id);
        expect(response.body.UserId).toBe(user.id);
        const mediaAssets = await MediaAsset.findAll({ where: {} });
        expect(mediaAssets.length).toBe(1);

        done();
      });

      it("can retrieve created project for the logged-in user", async done => {
        // create while logged in
        // const projectPayload = projectFactory.one();
        // title: Joi.string().required(),
        // source_code_url: Joi.string().uri().required(),
        // live_url: Joi.string().uri().required(),
        // MbEventId: Joi.string().uuid().required()
        const projectPayload = {
          title: "testproject",
          source_code_url: "https://google.com",
          live_url: "https://google.com",
          MbEventId: mbEvent.id,
          MediaAssets: [{ cloudinaryPublicId: "abcd1234" }]
        };

        const postResponse = await agent
          .post("/api/v1/project")
          .send(projectPayload);

        const response = await agent.get(
          "/api/v1/project/" + postResponse.body.id
        );

        expect(response.statusCode).toBe(200);
        expect(response.body.MbEventId).toBe(mbEvent.id);
        expect(response.body.UserId).toBe(user.id);
        expect(response.body.MediaAssets[0].cloudinaryPublicId).toBe(
          "abcd1234"
        );
        const mediaAssets = await MediaAsset.findAll({ where: {} });
        expect(mediaAssets.length).toBe(1);

        done();
      });

      it("does not accept projects without MediaAsset", async done => {
        // GET BEFORE CREATE SHOULD BE EMPTY
        const beforeResponse = await agent.get("/api/v1/project");

        expect(beforeResponse.statusCode).toBe(200);
        expect(beforeResponse.body.length).toBe(0);

        // CREATE
        const projectPayload = {
          title: "testproject",
          source_code_url: "https://google.com",
          live_url: "https://google.com",
          MbEventId: mbEvent.id
        };

        const createResponse = await agent
          .post("/api/v1/project")
          .send(projectPayload);

        expect(createResponse.statusCode).toBe(400);
        const mediaAssets = await MediaAsset.findAll({ where: {} });
        expect(mediaAssets.length).toBe(0);

        done();
      });

      it("does not accept projects with empty MediaAsset", async done => {
        // GET BEFORE CREATE SHOULD BE EMPTY
        const beforeResponse = await agent.get("/api/v1/project");

        expect(beforeResponse.statusCode).toBe(200);
        expect(beforeResponse.body.length).toBe(0);

        // CREATE
        const projectPayload = {
          title: "testproject",
          source_code_url: "https://google.com",
          live_url: "https://google.com",
          MbEventId: mbEvent.id,
          MediaAssets: []
        };

        const createResponse = await agent
          .post("/api/v1/project")
          .send(projectPayload);

        expect(createResponse.statusCode).toBe(400);
        const mediaAssets = await MediaAsset.findAll({ where: {} });
        expect(mediaAssets.length).toBe(0);

        done();
      });

      it("does not accept projects with more than 5 MediaAsset", async done => {
        // GET BEFORE CREATE SHOULD BE EMPTY
        const beforeResponse = await agent.get("/api/v1/project");

        expect(beforeResponse.statusCode).toBe(200);
        expect(beforeResponse.body.length).toBe(0);

        // CREATE
        const projectPayload = {
          title: "testproject",
          source_code_url: "https://google.com",
          live_url: "https://google.com",
          MbEventId: mbEvent.id,
          MediaAssets: [
            { cloudinaryPublicId: "abcdxyz1 " },
            { cloudinaryPublicId: "abcdxyz2 " },
            { cloudinaryPublicId: "abcdxyz3 " },
            { cloudinaryPublicId: "abcdxyz4 " },
            { cloudinaryPublicId: "abcdxyz5 " },
            { cloudinaryPublicId: "abcdxyz6 " }
          ]
        };

        const createResponse = await agent
          .post("/api/v1/project")
          .send(projectPayload);

        expect(createResponse.statusCode).toBe(400);

        const mediaAssets = await MediaAsset.findAll({ where: {} });
        expect(mediaAssets.length).toBe(0);

        done();
      });
    });
  });
});
