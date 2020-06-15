const { Router } = require('express');
const { requireAuth, requireAdmin } = require('./routers.util');
const { MbEvent, User, Project, Vote, MediaAsset, ProjectMediaAsset, sequelize } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');
const projectService = require('../services/projectService');

const projectRoute = new Router();

projectRoute.get('/', requireAuth, async (req, res, next) => {
  projectService.search({ UserId: req.user.id })
    .then(projects => res.json(projects))
    .catch(e => next(err));
});

const VALID_SORT_FIELDS = {
  'CREATED_AT': 'p."createdAt"',
  'RATING_AVERAGE': 'TRUNC(AVG(v.rating), 2)',
  'RATING_COUNT': 'COUNT(v.*)'
}
const VALID_SORT_DIRECTIONS = {
  'desc': 'desc',
  'asc': 'asc'
}
projectRoute.get('/search',  validator.query(Joi.object({
    search_query: Joi.string().optional().default('').allow(''),
    filter_userId: Joi.string().uuid().min(1).optional(),
    filter_mbEventId: Joi.string().uuid().min(1).optional(),
    filter_ratingAverage_min: Joi.number().min(0).max(10).optional(),
    filter_ratingCount_min: Joi.number().min(0).optional(),
    sort_direction: Joi.string().valid(...Object.keys(VALID_SORT_DIRECTIONS)).optional().default('desc'),
    sort_field: Joi.string().valid(...Object.keys(VALID_SORT_FIELDS)).optional().default('RATING_AVERAGE'),
    limit: Joi.number().max(100).optional().default(25),
    offset: Joi.number().min(0).optional().default(0)
  })),
  async (req, res, next) => {
    const defaults = {
      search_query: undefined,
      filter_userId: undefined,
      filter_mbEventId: undefined,
      filter_ratingCount_min: undefined,
      filter_ratingAverage_min: undefined,
      sort_direction: 'desc',
      sort_field: 'RATING_AVERAGE',
      limit: 10,
      offset: 0
    }

    // generate defaults
    const bindings = {};
    Object.entries(defaults).forEach(([field, defaultValue]) => {
      const queryValue = req.query[field];
      bindings[field] = queryValue === undefined ? defaultValue : queryValue;
    });

    // clean search_query to trim && remove empty strings
    bindings.search_query = bindings.search_query
      ? bindings.search_query.trim()
      : undefined;

    // coerce '' and other falseys to undefined
    if (!bindings.search_query) {
      bindings.search_query = undefined;
    } else {
      bindings.search_query = `%${bindings.search_query}%`
    }

    // set sort field
    bindings.sort_field = VALID_SORT_FIELDS[bindings.sort_field || defaults.sort_field];
    bindings.sort_direction = VALID_SORT_DIRECTIONS[bindings.sort_direction || defaults.sort_direction];

    let sql = `
      SELECT  
        p.id AS "id",
        p."title" AS "title",
        p."live_url" AS "live_url",
        mbe."cover_image_url" AS "mbevent_cover_image_url",
        ma."cloudinaryPublicId" AS "cloudinaryPublicId",
        (u."firstname" || ' ' || u."lastname") AS "user_fullname",
        COUNT(v.*) AS "ratingCount",
        TRUNC(AVG(v.rating), 2) AS "ratingAverage"
      FROM "Projects" AS p
        LEFT JOIN "Users" AS u ON p."UserId" = u."id"
        LEFT JOIN "MbEvents" AS mbe ON p."MbEventId" = mbe.id
        LEFT JOIN "Votes" AS v ON v."ProjectId" = p.id
        LEFT JOIN "ProjectMediaAssets" AS pma ON pma."ProjectId" = p.id
        LEFT JOIN "MediaAssets" AS ma ON pma."MediaAssetId" = ma.id
      WHERE 1 = 1 
        ${bindings.search_query !== undefined 
          ? "\
            AND((u.\"firstname\" || ' ' || u.\"lastname\") ILIKE $search_query \
            OR (p.\"title\" ILIKE $search_query)) \
          " 
          : ''
        }
        ${bindings.filter_userId !== undefined 
          ? "AND  u.id = COALESCE($filter_userId, u.id)" 
          : ''
        }
        ${bindings.filter_mbEventId !== undefined 
          ? 'AND  mbe.id = COALESCE($filter_mbEventId, mbe.id)' 
          : ''
        }
      GROUP BY p."id", u."id", mbe."id", ma."cloudinaryPublicId"
      HAVING 1 = 1
        ${bindings.filter_ratingCount_min !== undefined ? 'AND COUNT(v.*) >= COALESCE($filter_ratingCount_min, 0)' : ''}
        ${bindings.filter_ratingAverage_min !== undefined ? 'AND  TRUNC(AVG(v.rating), 2) >= COALESCE($filter_ratingAverage_min, 0)' : ''}
      ORDER BY ${bindings.sort_field} ${bindings.sort_direction}
      LIMIT $limit OFFSET $offset;
    `;

    try {
      const results = await sequelize.query(sql, {
        model: Project,
        mapToModel: true,
        bind: bindings,
        include: [
          {
            model: User
          }
        ]
      });
      
      res.json(results);
    } catch (e) {
      return next(e);
    }


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
    .then(project => {
      res.json(project)
    })
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

projectRoute.post('/uploadMediaAssets',
  requireAdmin,
  validator.body(Joi.object({
    ProjectId: Joi.string().uuid().required(),
    MediaAssets: Joi.array().items(Joi.object({
      cloudinaryPublicId: Joi.string().min(5).max(20).required()
    })).required().min(1).max(1)
  })),
  async (req, res, next) => {
    try {
      const params = { ProjectId, MediaAssets } = req.body;

      const project = await Project.findOne({ where: {id: ProjectId }});
      const UserId = project.UserId;
  
      const result = await sequelize.transaction(async transaction => {
        const mediaAssets = await MediaAsset.bulkCreate(MediaAssets.map(({ cloudinaryPublicId }) => ({ cloudinaryPublicId, UserId  })), { transaction });
        const projectMediaAssets = await ProjectMediaAsset.bulkCreate(mediaAssets.map((ma, i) => ({
          MediaAssetId: ma.id,
          ProjectId: project.id,
          UserId
        })), { transaction })
      });

      res.json({ message: 'ok' })
    } catch (e) {
      console.log("Error while trying to upload media asset to existing project", e);
      return next(e);
    }
  });

projectRoute.post('/deleteMediaAsset',
  requireAdmin,
  validator.body(Joi.object({
    ProjectId: Joi.string().uuid().required(),
    MediaAssetId: Joi.string().uuid().required()
  })),
  async (req, res, next) => {
    try {
      const { ProjectId, MediaAssetId } = req.body;
  
      const projectMediaAsset = await ProjectMediaAsset.findOne({ where: { ProjectId, MediaAssetId }});
  
      if (!projectMediaAsset) {
        return res.status(404).json({ message: 'No such assets found' });
      } else {
        const deleted = await projectMediaAsset.destroy();
        return res.json(deleted);
      }
    } catch (e) {
      console.log(`Error while deleting media asset, ProjectId=[${ProjectId}] MediaAssetId=[${MediaAssetId}]`);
      next(e);
    }
    
  });


module.exports = projectRoute;