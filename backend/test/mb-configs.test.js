const supertest = require("supertest");
const app = require("../src/app");
const {
  TEST_EMAIL,
  TEST_ADMIN_EMAIL,
  TEST_PASSWORD
} = require("./test.constants");
const userFactory = require("../src/db/factories/user.factory");
// const projectFactory = require('../src/db/factories/project.factory');
const { User, MbConfig, Project } = require("../src/db/models");

const TEST_CONFIG_FEATURED_SECTIONS = {
  key: "featuredSections",
  val: {
    sections: [
      {
        title: "ReactJS Projects",
        projectIds: [
          "e6132ded-a49c-484f-85d6-de3d32113b6f",
          "940722f5-160b-4a16-a8c6-d008bcb9e143",
          "2f4a78e8-51e0-438b-b906-eee202cf5f09"
        ]
      },
      {
        title: "API Integration Projects",
        projectIds: [
          "3e801a2c-781a-4d8b-91c9-2cb628ccf558",
          "a565f14a-496f-44ad-a7d0-c29a5b3488ba",
          "6b06ff1b-0a4e-47df-8b3e-dcb1a821a4e4"
        ]
      }
    ]
  }
};

const clear = async done => {
  await MbConfig.destroy({ where: {} });
  await User.destroy({ where: {} });
  user = undefined;
  admin = undefined;
  mbConfig = undefined;
  done();
};

describe("MbConfig Model", () => {
  let user;
  let admin;
  let mbConfig;
  let agent = null;

  describe("GET /mb-config", () => {
    beforeAll(async done => {
      clear(done);
    });

    afterAll(async done => {
      clear(done);
    });

    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(
          userFactory.one({
            email: TEST_EMAIL,
            password: TEST_PASSWORD
          })
        );
        admin = await User.create(
          userFactory.one({
            isAdmin: true,
            email: TEST_ADMIN_EMAIL,
            password: TEST_PASSWORD
          })
        );
        mbConfig = await MbConfig.create({
          configKey: TEST_CONFIG_FEATURED_SECTIONS.key,
          configValue: JSON.stringify(TEST_CONFIG_FEATURED_SECTIONS.val)
        });

        done();
      } catch (e) {
        done(e);
      }
    });

    afterEach(async done => {
      try {
        await User.destroy({ where: {} });
        await MbConfig.destroy({ where: {} });
        done();
      } catch (e) {
        done(e);
      }
    });

    describe("When logged out", () => {
      it("can GET a config value by key from /mb-config/:key ", async done => {
        // fetch without auth
        const response = await agent.get(
          "/api/v1/mb-config/" + TEST_CONFIG_FEATURED_SECTIONS.key
        );
        // expect server to return config as JSON obj

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.configValue).toMatchObject(
          TEST_CONFIG_FEATURED_SECTIONS.val
        );

        done();
      });
    });

    describe("When logged in", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        done();
      });

      it("can GET config value from key", async done => {
        // fetch while logged in
        const response = await agent.get(
          "/api/v1/mb-config/" + TEST_CONFIG_FEATURED_SECTIONS.key
        );

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.configValue).toMatchObject(
          TEST_CONFIG_FEATURED_SECTIONS.val
        );

        done();
      });
    });
  });
  describe("PATCH /mb-config", () => {
    const FEATURED_SECTIONS_PAYLOAD = {
      configValue: {
        sections: [
          {
            title: "ReactJS Projects",
            projectIds: [
              "e6132ded-a49c-484f-85d6-de3d32113b6f",
              "940722f5-160b-4a16-a8c6-d008bcb9e143"
            ]
          }
        ]
      }
    };
    beforeAll(async done => {
      clear(done);
    });

    afterAll(async done => {
      clear(done);
    });

    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(
          userFactory.one({
            email: TEST_EMAIL,
            password: TEST_PASSWORD
          })
        );
        admin = await User.create(
          userFactory.one({
            isAdmin: true,
            email: TEST_ADMIN_EMAIL,
            password: TEST_PASSWORD
          })
        );
        mbConfig = await MbConfig.create({
          configKey: TEST_CONFIG_FEATURED_SECTIONS.key,
          configValue: JSON.stringify(TEST_CONFIG_FEATURED_SECTIONS.val)
        });

        done();
      } catch (e) {
        done(e);
      }
    });

    afterEach(async done => {
      try {
        await User.destroy({ where: {} });
        await MbConfig.destroy({ where: {} });
        done();
      } catch (e) {
        done(e);
      }
    });

    describe("When not logged in", () => {
      it("cannot PATCH /mb-config/:key", async done => {
        // fetch while logged out
        const response = await agent.patch(
          "/api/v1/mb-config/" + TEST_CONFIG_FEATURED_SECTIONS.key,
          FEATURED_SECTIONS_PAYLOAD
        );
        expect(response.body).toBeTruthy();
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("You are not logged in.");

        done();
      });
    });
    describe("When logged in but not admin", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        done();
      });

      it("cannot PATCH /mb-config/:key", async done => {
        // fetch while logged in
        const response = await agent.patch(
          "/api/v1/mb-config/" + TEST_CONFIG_FEATURED_SECTIONS.key,
          FEATURED_SECTIONS_PAYLOAD
        );
        expect(response.body).toBeTruthy();
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("You must be admin");

        done();
      });
    });
    describe("When admin", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_ADMIN_EMAIL, password: TEST_PASSWORD });
        done();
      });

      it("can PATCH /mb-config/:key", async done => {
        // fetch while logged in as admin
        const response = await agent
          .patch("/api/v1/mb-config/" + TEST_CONFIG_FEATURED_SECTIONS.key)
          .send(FEATURED_SECTIONS_PAYLOAD);

        expect(response.statusCode).toBe(200);

        expect(response.body).toBeTruthy();

        expect(typeof response.body).toBe("object");
        expect(typeof response.body.id).toBe("string");
        expect(typeof response.body.configValue).toBe("object");

        expect(response.body.configKey).toMatch(
          TEST_CONFIG_FEATURED_SECTIONS.key
        );
        // ensure updated config value is returned
        expect(response.body.configValue).toMatchObject(
          FEATURED_SECTIONS_PAYLOAD.configValue
        );

        done();
      });
    });
  });
});
