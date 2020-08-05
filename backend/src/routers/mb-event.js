const { Router } = require("express");
const { requireAdmin } = require("./routers.util");
const { MbEvent, User, Project, Vote, MediaAsset } = require("../db/models");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const sequelize = require("sequelize");
const dates = require("../utils/dates");

const mbEventRoute = new Router();

// IMPORTANT: events storage/retrieval must adjust start/end time for wallclock time
// (../utils/dates.js)
// storage: toWallclockTime(datetimeStr)
// retrieval: toDatetimeStr(wallclockTime)

mbEventRoute.get("/", async (req, res, next) => {
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
                "reset_token_created_at",
                "confirmed",
                "confirmation_token"
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
    .then(events => {
      // wallclock time adjusted
      // const adjusted = events.map(event => {
      //   const adjustedStart = dates.toDatetimeStr(event.start_time);
      //   const adjustedEnd = dates.toDatetimeStr(event.start_time);
      //   return { ...event, start_time: adjustedStart, end_time: adjustedEnd };
      // });
      // console.log(adjusted);
      const adjusted = events.map(e => {
        const eJson = e.toJSON();
        return {
          ...eJson,
          start_time: dates.toDatetimeStr(eJson.start_time),
          end_time: dates.toDatetimeStr(eJson.end_time)
        };
      });

      console.log(adjusted);
      res.json(adjusted);
    })
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
