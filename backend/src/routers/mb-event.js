const { Router } = require("express");
const { requireAdmin } = require("./routers.util");
const { MbEvent, User, Project, Vote, MediaAsset } = require("../db/models");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const sequelize = require("sequelize");

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
  (req, res, next) => {
    const { id } = req.params;

    MbEvent.findOne({ where: { id } })
      .then(obj => res.json(obj))
      .catch(e => next(e));
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
      start_time: Joi.date().required(),
      end_time: Joi.date().required()
    })
  ),
  async (req, res, next) => {
    console.log(req.body);
    MbEvent.create(
      ({
        title,
        description,
        cover_image_url,
        instructions,
        start_time,
        end_time
      } = req.body)
    )
      .then(resp => res.json(resp))
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
);

module.exports = mbEventRoute;
