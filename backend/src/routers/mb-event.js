const { Router } = require('express');
// const { requireAuth } = require('./routers.util');
const { MbEvent, User, Project, Vote } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');

const mbEventRoute = new Router();

mbEventRoute.get('/', async (req, res, next) => {
  const start = new Date() - (4 * 24 * 60 * 60 * 1000); // 4 days before
  const end = new Date() + (14 * 24 * 60 * 60 * 1000); // 14 days into the future

  MbEvent.findAll({
    include: [
      {
        model:  Project,
        include: [
          {
            model: User
          },
          {
            model: Vote
          }
        ]
      }
    ]
  })
    .then(events => res.json(events))
    .catch(err => {
      next(err);
    })
});

// mbEventRoute.post('/', 
//   validator.query(Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     cover_image_url: Joi.string().required(),
//     instructions: Joi.string().required(),
//     start_time: Joi.date().required(),
//     end_time: Joi.date().required()
//   })),
//   async (req, res, next) => {
//     console.log(req.body);
//     MbEvent.create({ title, description, cover_image_url, instructions, start_time, end_time } = req.body)
//       .then(resp => res.json(resp))
//       .catch(err => {
//         console.log(err);
//         next(err)
//       });
// })

module.exports = mbEventRoute;