const { Router } = require("express");
const { requireAdmin } = require("./routers.util");
const { MbEvent, User, Project, Vote, MediaAsset } = require("../db/models");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const sequelize = require("sequelize");
const dates = require("../utils/dates");

const mbEventRoute = new Router();

mbEventRoute.get("/", async (req, res, next) => {
  const start = new Date() - 4 * 24 * 60 * 60 * 1000; // 4 days before
  const end = new Date() + 14 * 24 * 60 * 60 * 1000; // 14 days into the future

  MbEvent.findAll({
    include: [
      {
        model: Project,
        attributes: {
          include: [
            [
              sequelize.cast(
                sequelize.fn("AVG", sequelize.col("Projects.Votes.rating")),
                "float"
              ),
              "ratingAverage"
            ],
            [
              sequelize.cast(
                sequelize.fn("COUNT", sequelize.col("Projects.Votes.id")),
                "int"
              ),
              "ratingCount"
            ]
          ]
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "password_hash",
                "reset_token",
                "reset_token_created_at"
              ]
            }
          },
          {
            model: Vote
          },
          {
            model: MediaAsset
          }
        ]
      }
    ],
    group: [
      "MbEvent.id",
      "Projects.id",
      "Projects.User.id",
      "Projects.MediaAssets.id",
      "Projects.MediaAssets.ProjectMediaAsset.id",
      "Projects.Votes.id"
    ],
    subQuery: false
  })
    .then(events => res.json(events))
    .catch(err => {
      next(err);
    });
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
      const event = await MbEvent.findOne({ where: { id } });
      const walltimeAdjustedEvent = {
        ...event.dataValues,
        start_time: dates.toDatetimeStr(event.start_time),
        end_time: dates.toDatetimeStr(event.end_time)
      };
      res.status(200).json(walltimeAdjustedEvent);
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
    // console.log(req.body.dataValues);
    const wallclockAdjustedEvent = {
      ...req.body,
      start_time: dates.toWallclockTime(req.body.start_time),
      end_time: dates.toWallclockTime(req.body.end_time)
    };
    try {
      // convert datetime strings to UTC wallclock
      const event = await MbEvent.create(wallclockAdjustedEvent);
      res.status(200).json(event);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

module.exports = mbEventRoute;
