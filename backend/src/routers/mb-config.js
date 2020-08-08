const { Router } = require("express");
const { requireAdmin } = require("./routers.util");
const {
  MbConfig,
  User,
  MbEvent,
  Project,
  MediaAsset
} = require("../db/models");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const validations = require("../validations");
const mbConfigRoute = new Router();
const mbConfigService = require("../services/mbConfigService");

const FEATURED_SECTIONS_KEY = "featuredSections";

mbConfigRoute.get(
  "/:key",
  validator.params(validations.mbConfig.keyObj),
  async (req, res, next) => {
    const { key } = req.params;

    try {
      const value = await mbConfigService.findByKey(key);
      res.status(200).json(value);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

mbConfigRoute.patch(
  "/:key",
  requireAdmin,
  validator.params(validations.mbConfig.keyObj),
  validator.body(validations.mbConfig.mbConfigObj),
  async (req, res, next) => {
    const { key } = req.params;
    try {
      const config = await mbConfigService.updateByKey(
        key,
        req.body.configValue
      );
      return res.status(200).json(config);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

// for returning sections that include project associations
mbConfigRoute.get("/asc/featured-sections", async (req, res, next) => {
  let val;

  try {
    const response = await MbConfig.findOne({
      where: { configKey: FEATURED_SECTIONS_KEY }
    });
    if (response) {
      val = JSON.parse(response.configValue);
    } else {
      return next();
    }
  } catch (e) {
    return next(e);
  }

  let pids = new Set();
  val.sections.forEach(s => {
    s.projectIds.forEach(pid => pids.add(pid));
  });

  const pidsArray = Array.from(pids);

  try {
    projects = await Project.findAll({
      where: { id: pidsArray },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password_hash", "reset_token", "reset_token_created_at"]
          }
        },
        { model: MbEvent },
        { model: MediaAsset }
      ]
    });
  } catch (e) {
    return next(e);
  }

  const responseObj = val.sections.map(section => {
    const projs = section.projectIds.map(pid =>
      projects.find(p => p.id === pid)
    );
    return {
      title: section.title,
      projects: projs
    };
  });

  res.json(responseObj);
});

module.exports = mbConfigRoute;
