 const { Router } = require('express');
const { requireAuth } = require('./routers.util');
const { MbEvent, User, Project, Vote } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');

const userRoute = new Router();

userRoute.get('/:id', requireAuth, validator.params(Joi.object({id: Joi.string().required()})), async (req, res, next) => {
  const { id } = req.params;

  User.findOne({
    where: { id },
    include: [
      {
        model: Project,
        include: [{
          model: MbEvent
        }]
      }
    ]
  })
    .then(project => res.json(project))
    .catch(err => next(err));
});

module.exports = userRoute;
