const { Router } = require('express');
// const { requireAdmin } = require('./routers.util');
const { MbConfig, User, MbEvent, Project, MediaAsset } = require('../db/models');
const Joi = require('@hapi/joi');
const validator = require('../validator');
const sequelize = require('sequelize');
const findProject = require('../services/projectService').find;
const mbConfigRoute = new Router();

const FEATURED_SECTIONS_KEY = 'featuredSections';

mbConfigRoute.get('/:key',
  validator.params(Joi.object({key: Joi.string().required()})),
  async (req, res, next) => {
    const { key } = req.params;

    MbConfig.findOne({ where: { configKey: key }})
      .then(config => res.json(config.configValue))
      .catch(err => next(err));
});

mbConfigRoute.patch('/:key',
  // validator.params(Joi.object({key: Joi.string().required()})),
  // validator.body(Joi.object({configValue: Joi.any()})),
  async (req, res, next) => {
    const { key } = req.params;
    console.log(req.body)

    try {
      let config = await MbConfig.findOne({ where: {
        configKey: key,
      }});

      if (config) {
        const stringifiedValue = JSON.stringify(req.body.configValue)
        config = await config.update({
          configValue: stringifiedValue,
        });
      }
       else {
        const params = { configKey: key, configValue: req.configValue };
        config = await MbConfig.create(params);
      }

      res.json(config);
    } catch (e) {
      return next(e);
    }
});

// for returning sections that include project associations
mbConfigRoute.get('/asc/featured-sections',
  async (req, res, next) => {
    let val;

    try {
      const response = await MbConfig.findOne({ where: { configKey: FEATURED_SECTIONS_KEY }})
      val = JSON.parse(response.configValue);
    } catch (e) {
      return next(e);
    }

    let pids = new Set();
    val.sections.forEach(s => {
      s.projectIds.forEach(pid => pids.add(pid));
    });

    const pidsArray = Array.from(pids);

    let projects;
    try {
      projects = await Project.findAll({
        where: { id: pidsArray },
        include: [
          { model: User, attributes: {exclude: ['password', 'password_hash'] }},
          { model: MbEvent },
          { model: MediaAsset }
        ],

      })
    } catch (e) {
      return next(e);
    }

    const responseObj = val.sections.map(section => {
      const projs = section.projectIds.map(pid => projects.find(p => p.id === pid));

      return {
        title: section.title,
        projects: projs
      }
    });

    res.json(responseObj);
  }
);

module.exports = mbConfigRoute;
