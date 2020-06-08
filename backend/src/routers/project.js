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


const VALID_SORT_FIELDS = {
  'CREATED_AT': '"Project"."createdAt"',
  'RATING_AVERAGE': '"ratingAverage"',
  'RATING_COUNT': '"ratingCount"'
}
const VALID_SORT_DIRECTIONS = {
  'desc': 'desc',
  'asc': 'asc'
}
projectRoute.get('/search', 
  validator.query(Joi.object({
    filter_userId: Joi.string().uuid().min(1),
    filter_mbEventId: Joi.string().uuid().min(1),
    sort_direction: Joi.string().valid(...Object.keys(VALID_SORT_DIRECTIONS)),
    sort_field: Joi.string().valid(...Object.keys(VALID_SORT_FIELDS)),
    limit: Joi.number().max(100),
    offset: Joi.number().min(0)
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
 
  // set filters
  const where = {
    users: {},
    mbEvents: {}
  };

  const orderBy = {
    field: '"ratingAverage"',
    direction: 'DESC' 
  }

  const pagination = {
    limit: req.params.limit || 25,
    offset: req.params.offset || 0
  }

  const ifParam = (paramName, callback) => {
    const value = req.params[paramName];
    if (!!value) {
      callback(value);
    }
  }
  
  // Handle req.params.filter_userId
  ifParam('filter_userId', userId => where.users.id = userId);

  // Handle req.params.filter_mbEventId
  ifParam('filter_mbEventId', mbEventId => where.mbEvents.id = mbEventId);
  
  // Handle req.params.sort_direction
  ifParam('sort_direction', sortDirection => orderBy.field = VALID_SORT_DIRECTIONS[sortDirection]);
  
  // Handle req.params.sort_field
  ifParam('sort_field', sortField => orderBy.field = VALID_SORT_FIELDS[sortField]);
  // Handle req.params.limit
  // Handle req.params.offset
  
  const doIf = (value, callback) => value !== undefined && callback(value);
  doIf(req.query.filter_userId, val => where.users.id = val);
  doIf(req.query.filter_mbEventId, val => where.mbEvents.id = val);
  doIf(req.query.sort_field, val => orderBy.field = VALID_SORT_FIELDS[val])
  doIf(req.query.sort_direction, val => orderBy.direction = VALID_SORT_DIRECTIONS[val]);

  let orderByString = '';
  if (!orderBy.field || !orderBy.direction) {
    return next(new Error('Incorrect parameters ' + JSON.stringify(req.params)));
  } else {
    orderByString = `"ratingAverage" ${orderBy.direction}`;
    // orderByString = `"${orderBy.field}" ${orderBy.direction}`;
  }

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
      },
      {
        model: User,
        attributes: ['firstname', 'lastname'],
        where: where.users
      },
      // {
      //   model: MbEvent,
      //   attributes: [],
      //   where: where.mbEvents
      // },
      {
        model: MediaAsset
      }
    ],
    group: ['Project.id', 'User.id', 'MediaAssets.id', 'MediaAssets.ProjectMediaAsset.id'],
    order: [sequelize.literal(orderByString)],
    limit: pagination.limit,
    offset: pagination.offset,
    subQuery: false
  })
  .then(resp => res.json(resp))
  .catch(err => next(err));
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