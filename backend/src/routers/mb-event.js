const { Router } = require("express");
const mbEventRoute = new Router();
const { requireAdmin } = require("./routers.util");
const { MbEvent, User, Project, Vote, MediaAsset } = require("../db/models");
const MbEventDao = require("../daos/MbEventDao");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const sequelize = require("sequelize");
const dates = require("../utils/dates");
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
  validator.params(
    Joi.object({
      id: Joi.string().required()
    })
  ),
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
  validator.body(
    Joi.object({
      title: Joi.string()
        .min(1)
        .required(),
      description: Joi.string()
        .min(1)
        .required(),
      cover_image_url: Joi.string()
        .uri()
        .min(1)
        .required(),
      instructions: Joi.string()
        .min(1)
        .required(),
      register_link: Joi.string()
        .min(1)
        .required(),
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
      region: Joi.string()
        .min(1)
        .required()
    })
  ),
  async (req, res, next) => {
    // convert datetime strings to UTC wallclock
    const wallclockAdjustedEvent = {
      ...req.body,
      start_time: dates.toWallclockTime(req.body.start_time),
      end_time: dates.toWallclockTime(req.body.end_time)
    };
    try {
      const event = await MbEvent.create(wallclockAdjustedEvent);
      res.status(200).json(event);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

module.exports = mbEventRoute;
