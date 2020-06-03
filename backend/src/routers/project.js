const { Router } = require('express');
const { requireAuth } = require('./routers.util');
const { MbEvent, User, Project, Vote, MediaAsset, ProjectMediaAsset, sequelize } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');

const projectRoute = new Router();

projectRoute.get('/', requireAuth, async (req, res, next) => {
  req.user.getProjects()
    .then(projects => res.json(projects))
    .catch(e => next(err));
});

projectRoute.get('/:id', validator.params(Joi.object({id: Joi.string().required()})), async (req, res, next) => {
  const { id } = req.params;

  Project.findOne({ 
    where: { id },
    include: [
      {
        model: Vote,
        include: [{
          model: User
        }]
      },
      { model: User },
      { model: MediaAsset }
    ]
  })
    .then(project => res.json(project))
    .catch(err => next(err));
});

projectRoute.post('/',
  requireAuth, 
  validator.body(Joi.object({
    title: Joi.string().required(),
    source_code_url: Joi.string().uri().required(),
    live_url: Joi.string().uri().required(),
    MbEventId: Joi.string().uuid().required(),
    MediaAssets: Joi.array().items(Joi.object({
      cloudinaryPublicId: Joi.string().min(5).max(20).required()
    })).min(1).max(5).required()
  })),
  async (req, res, next) => {
    const params = { title, source_code_url, live_url, mb_event_id, MbEventId, MediaAssets } = req.body;
    const UserId = req.user.id;

    let project;

    const result = await sequelize.transaction(async transaction => {
      project = await Project.create({ title, source_code_url, live_url, mb_event_id, MbEventId, UserId }, { transaction });
      const mediaAssets = await MediaAsset.bulkCreate(MediaAssets.map(({ cloudinaryPublicId }) => ({ cloudinaryPublicId, UserId  })), { transaction });
      const projectMediaAssets = await ProjectMediaAsset.bulkCreate(mediaAssets.map((ma, i) => ({
        MediaAssetId: ma.id,
        ProjectId: project.id,
        UserId,
        listOrder: i
      })), { transaction })
    })

    // try {
    //   project = await Project.create(params, {
    //     include: [MediaAsset, MbEventId]
    //   });
    // } catch (e) {
    //   return next(e);
    // }

    try {
      project = await Project.findOne({
        where: { id: project.id },
        include: [
          { model: MbEvent },
          { model: User },
          { model: MediaAsset }
        ]
      });
    } catch (e) {
      return next(e);
    }

    return res.json(project);
  });


module.exports = projectRoute;