const { Router } = require("express");
const mbEventRoute = new Router();
const { requireAdmin } = require("./routers.util");
const validator = require("../validator");
const validations = require("../validations");
const mbEventService = require("../services/mbEventService");

mbEventRoute.get("/", async (req, res, next) => {
  try {
    const events = await mbEventService.listAll();
    res.status(200).json(events);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

mbEventRoute.get(
  "/:id",
  validator.params(validations.common.id),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const event = await mbEventService.findById(id);
      res.status(200).json(event);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

mbEventRoute.post(
  "/",
  requireAdmin,
  validator.body(validations.mbEvent.eventPlain),
  async (req, res, next) => {
    try {
      const event = await mbEventService.create(req.body);
      res.status(200).json(event);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

module.exports = mbEventRoute;
