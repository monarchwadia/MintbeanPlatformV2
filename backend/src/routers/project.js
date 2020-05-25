const { Router } = require('express');
const { requireAuth } = require('./routers.util');
const { MbUser, Project } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');

const projectRoute = new Router();

projectRoute.get('/', requireAuth, async (req, res, next) => {
  req.user.getProjects()
    .then(projects => res.json(projects))
    .catch(e => next(err));
});

// projectRoute.put('/', requireAuth, async (req, res, next) => {
//   MbUser.findAll()
//    .then(events => res.json(events))
//    .catch(err => {
//      next(err);
//    })
// });

projectRoute.post('/',
  requireAuth, 
  validator.body(Joi.object({
    title: Joi.string().required(),
    source_code_url: Joi.string().uri().required(),
    live_url: Joi.string().uri().required(),
    MbEventId: Joi.string().uuid().required()
  })),
  async (req, res, next) => {
    const params = { title, source_code_url, live_url, mb_event_id, MbEventId } = req.body;
    params.UserId = req.user.id;

    Project.create(params)
    .then(project => res.json(project))
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

module.exports = projectRoute;