const { Router } = require("express");
const { requireAdmin } = require("./routers.util");
const validator = require("../validator");
const validations = require("../validations");
const mbConfigRoute = new Router();
const mbConfigService = require("../services/mbConfigService");

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
  validator.body(validations.mbConfig.patchMbConfig),
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
  try {
    const sections = await mbConfigService.getAscFeaturedSectionsArr();
    res.status(200).json(sections);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = mbConfigRoute;
