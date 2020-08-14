const { Router } = require("express");
const { requireAuth, requireAdmin } = require("./routers.util");
const {
  MbEvent,
  User,
  Project,
  Vote,
  MediaAsset,
  ProjectMediaAsset,
  sequelize
} = require("../db/models");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const validations = require("../validations");
const projectService = require("../services/projectService");

const projectRoute = new Router();

projectRoute.get("/", requireAuth, async (req, res, next) => {
  projectService
    .search({ UserId: req.user.id })
    .then(projects => {
      res.json(projects);
    })
    .catch(e => next(e));
});

projectRoute.get(
  "/search",
  validator.query(validations.project.projectSearchQuery),
  async (req, res, next) => {
    try {
      const response = await projectService.search(req.query);
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

projectRoute.get(
  "/:id",
  validator.params(validations.common.id),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const project = await projectService.findById(id);
      res.json(project);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

projectRoute.post(
  "/",
  requireAuth,
  validator.body(validations.project.createProject),
  async (req, res, next) => {
    const params = ({
      title,
      source_code_url,
      live_url,
      mb_event_id,
      MbEventId,
      MediaAssets
    } = req.body);
    const UserId = req.user.id;

    try {
      const project = await projectService.create({ UserId, ...params });
      return res.json(project);
    } catch (err) {
      console.log({ err });
      return res.status(403).json({ err });
    }
  }
);

// NOT TESTED!
projectRoute.post(
  "/uploadMediaAssets",
  requireAdmin,
  // validator.body(validations.uploadMediaAssets),
  async (req, res, next) => {
    // TODO: implement this Daoified route once tested:
    // try {
    //   const { ProjectId, MediaAssets } = req.body;
    //   const project = await projectService.addMediaAssetsToProject(
    //     ProjectId,
    //     MediaAssets
    //   );
    //   res.status(200).json({ message: "OK" });
    // } catch (e) {
    //   console.log(e);
    //   next(e);
    // }

    try {
      const params = ({ ProjectId, MediaAssets } = req.body);

      const project = await Project.findOne({ where: { id: ProjectId } });
      const UserId = project.UserId;

      const result = await sequelize.transaction(async transaction => {
        const mediaAssets = await MediaAsset.bulkCreate(
          MediaAssets.map(({ cloudinaryPublicId }) => ({
            cloudinaryPublicId,
            UserId
          })),
          { transaction }
        );
        const projectMediaAssets = await ProjectMediaAsset.bulkCreate(
          mediaAssets.map((ma, i) => ({
            MediaAssetId: ma.id,
            ProjectId: project.id,
            UserId
          })),
          { transaction }
        );
      });

      res.json({ message: "ok" });
    } catch (e) {
      console.log(
        "Error while trying to upload media asset to existing project",
        e
      );
      return next(e);
    }
  }
);

projectRoute.post(
  "/deleteMediaAsset",
  requireAdmin,
  validator.body(validations.project.deleteMediaAsset),
  async (req, res, next) => {
    // TODO: implement this Daoified route once tested:
    // try {
    //   const { ProjectId, MediaAssetId } = req.body;
    //   const response = projectService.deleteProjectMediaAsset(
    //     ProjectId,
    //     MediaAssetId
    //   );
    //   res.status(200).json(response);
    // } catch (e) {
    //   console.log(e);
    //   next(e);
    // }

    try {
      const { ProjectId, MediaAssetId } = req.body;

      const projectMediaAsset = await ProjectMediaAsset.findOne({
        where: { ProjectId, MediaAssetId }
      });

      if (!projectMediaAsset) {
        return res.status(404).json({ message: "No such assets found" });
      } else {
        const deleted = await projectMediaAsset.destroy();
        return res.json(deleted);
      }
    } catch (e) {
      console.log(
        `Error while deleting media asset, ProjectId=[${ProjectId}] MediaAssetId=[${MediaAssetId}]`
      );
      next(e);
    }
  }
);

module.exports = projectRoute;
