const supertest = require("supertest");
const app = require("../src/app");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");
const userFactory = require('../src/db/factories/user.factory');
// const projectFactory = require('../src/db/factories/project.factory');
const { User, MbConfig, Project } = require('../src/db/models');

const testConfig = { key: 'featuredSections', val: '{"sections":[{"title":"ReactJS Projects","projectIds":["e6132ded-a49c-484f-85d6-de3d32113b6f","940722f5-160b-4a16-a8c6-d008bcb9e143","2f4a78e8-51e0-438b-b906-eee202cf5f09","58acb72c-df17-4e38-82a8-c1843274d55d","d7a658c6-0eca-4ddb-8d0d-ed406da4cc94","9c89a5bf-5b7b-44cd-a896-5b49b7d81f3d","4d82adf3-34a9-4daa-9d6e-896f1af1ab66","a565f14a-496f-44ad-a7d0-c29a5b3488ba","e21e5824-0ade-465a-aa3d-7eae60fde6b2","8fb63511-be6f-46ca-94e0-9387ad3821c7"]},{"title":"API Integration Projects","projectIds":["3e801a2c-781a-4d8b-91c9-2cb628ccf558","a565f14a-496f-44ad-a7d0-c29a5b3488ba","6b06ff1b-0a4e-47df-8b3e-dcb1a821a4e4","716bb1f9-c841-4862-8aff-7f1a07e4fa37","eb1ba401-e90d-4c5f-82c6-3355cfb6a51f","8993fb38-ec96-481a-a36d-84055baf28af","1874c9f5-4e6b-4188-acac-90b724aaf30e","c0a321c7-683c-408a-9cbd-75c4711cd7ee","e6132ded-a49c-484f-85d6-de3d32113b6f","6905e998-9cc3-497c-bb5d-a88913dd086f"]},{"title":"Creative Projects","projectIds":["8993fb38-ec96-481a-a36d-84055baf28af","eb1ba401-e90d-4c5f-82c6-3355cfb6a51f","e21e5824-0ade-465a-aa3d-7eae60fde6b2","c0a321c7-683c-408a-9cbd-75c4711cd7ee","be22e9c8-e016-4f54-bb69-2201ba733616","d4bdc7d1-6a73-4a1a-be22-e5192909c5f6","2c04ce66-1d59-4ac9-b08c-9ba0f9c6e53d","680dc483-613b-461f-bf0a-495231798b2c","38bc5309-12f3-4ec9-afed-89db5c910858","1680a236-6e63-4376-b45e-afaef3f616dc"]}]}'}

describe("MbConfig route", () => {
  let user;
  let mbConfig;

  afterEach(async (done) => {
    try {
      await User.destroy({where: {}});
      await MbConfig.destroy({where: {}});
      done();
    } catch (e) {
      done(e);
    }
  });

  let agent = null;

  describe("GET mb-config route", () => {
    beforeEach(async done => {
      agent = supertest.agent(app);
      try {
        user = await User.create(userFactory.one({ isAdmin: true, email: TEST_EMAIL, password: TEST_PASSWORD }));
        mbConfig = await MbConfig.create({ configKey: testConfig.key, configValue: testConfig.val});

        done();
      } catch (e) {
        done(e);
      }
    })

    afterEach(async done => {
      try {
        await User.destroy({where: {}});
        await MbConfig.destroy({where: {}});
        done();
      } catch (e) {
        done(e);
      }
    });

    it('can publically GET config value from key', async done => {
      // fetch while logged in
      const response = await agent
        .get("/api/v1/mb-config/" + testConfig.key);

      expect(response.statusCode).toBe(200);

      const resBody = response.body;

      expect(resBody).toBeTruthy();
      expect(resBody.configValue).toBe(testConfig.val);

      done();
    });

    describe("When logged in", () => {
      beforeEach(async done => {
        await agent
          .post("/api/v1/auth/login")
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
        done();
      });

      it('can GET config value from key', async done => {
        // fetch while logged in
        const response = await agent
          .get("/api/v1/mb-config/" + testConfig.key);

        expect(response.statusCode).toBe(200);

        const resBody = response.body;

        expect(resBody).toBeTruthy();
        expect(resBody.configValue).toBe(testConfig.val);

        done();
      });
    });
  });
});
