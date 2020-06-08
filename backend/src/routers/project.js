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

projectRoute.get('/search', 
  validator.params(Joi.object({
    filter_userId: Joi.string().uuid().min(1),
    filter_mbEventId: Joi.string().uuid().min(1),
    sort_order: Joi.string().valid('ascending', 'descending'),
    sort_field: Joi.string().valid('createdAt', 'ratingAverage', 'ratingCount')
  })),
  async (req, res, next) => {
    
  /*
  Supported params:
  Filter
  - userId
  - mbEventId
  - search string
  
  Sort
  - ascending/descending
  - created time
  - score
  */

  const where = {
    projects: {},
    users: {},
    votes: {},
    mbEvents: {}
  };

  const setIf = (value, callback) => {
    if (value !== undefined) {
      callback(value);
    }
  }

  setIf(req.params.filter_userId, val => where.users.id = val);
  setIf(req.params.filter_mbEventId, val => where.mbEvents.id = val);


  Project.findAll({
    attributes: {
      include: [
        [sequelize.cast(sequelize.fn('AVG', sequelize.col('Votes.rating')), 'float'), 'ratingAverage'],
        [sequelize.cast(sequelize.fn('COUNT', sequelize.col('Votes.id')), 'int'), 'ratingCount'],
      ]
    },
    include: [
      {
        model: Vote,
        attributes: []
      }
    ],
    group: ['Project.id']
  })
  .then(resp => res.json(resp))
  .catch(err => next(err));

  // Project.findAll({
  //   where: {},
  //   attributes: {
  //     include: [
  //       [sequelize.fn('AVG', sequelize.col('Votes.rating')), 'avgRating']
  //     ]
  //   },
  //   include: [
  //     {
  //       model: Vote,
  //       group: ['ProjectId']
  //     }
  //   ],
  //   group: ['Project.id', 'Votes.id']
  // })
  // .then(resp => res.json(resp))
  // .catch(err => next(err));

  // // // WORKS!
  // Vote.findAll({
  //   where: {},
  //   attributes: [
  //     "ProjectId",
  //     [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
  //   ],
  //   group: ['ProjectId']
  // })
  // .then(resp => res.json(resp))
  // .catch(err => next(err));





  // Project.findAll({
  //   where: {},
  //   attributes: {
  //     // attributes: {
  //         // include: [
  //         //   [sequelize.fn('COUNT', sequelize.col('Votes.rating')), 'avgRating']
  //         // ]
  //       // }
  //   },
  //   include: [
  //     {
  //       model: Vote,
  //       // attributes: {
  //       //   include: [
  //       //     [sequelize.fn('COUNT', sequelize.col('rating')), 'avgRating']
  //       //   ]
  //       // }
  //       attributes: {
  //         include: [
  //           [sequelize.fn('COUNT', sequelize.col('rating')), 'avgRating']
  //         ],
  //       },
  //       // groupBy: ['id']
  //     }
  //   ]
  // })
  // .then(resp => res.json(resp))
  // .catch(err => next(err));

  // Project.findAll({
  //   // where: where.projects,
  //   attributes: [
  //     ...Object.keys(Project.rawAttributes),
  //     [ sequelize.fn('AVG', sequelize.col('votes.rating')), 'votesRatingAverage' ],
  //     [ sequelize.fn('COUNT', sequelize.col('votes.rating')), 'votesRatingCount' ],
  //   ],
  //   include: [
  //     {
  //       model: MediaAsset
  //     },
  //     {
  //       model: User
  //     },
  //     {
  //       model: Vote
  //     },
  //     {
  //       model: MbEvent
  //     }
  //   ]
  // })
  // .then(resp => res.json(resp))
  // .catch(err => next(err));
});


projectRoute.get('/frontpage', async (req, res, next) => {
  Project.findAll({where:{}, include: ['MediaAssets', 'User', 'Votes']})
    .then(projects => res.json(projects))
    .catch(err => next(err));
})

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
        UserId
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