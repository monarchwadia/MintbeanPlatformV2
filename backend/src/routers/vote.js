const { Router } = require('express');
const { requireAuth } = require('./routers.util');
const { MbEvent, User, Project, Vote } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');

const voteRoute = new Router();

voteRoute.post('/',
  requireAuth, 
  validator.body(Joi.object({
    ProjectId: Joi.string().required(),
    rating: Joi.number().min(1).max(10).required(),
    comment: Joi.string().optional()
  })),
  async (req, res, next) => {
    let vote = await Vote.findOne({ where: {
      UserId: req.user.id,
      ProjectId: req.body.ProjectId
    }});

    try {
      if (vote) {
        vote = await vote.update({
          rating: req.body.rating,
          comment: req.body.comment
        });
      } else {
        const params = { ProjectId, rating, comment } = req.body;
        params.UserId = req.user.id;
        vote = await Vote.create(params);
      }
    } catch (e) {
      return next(e);
    }

    res.json(vote);
  }
);


module.exports = voteRoute;