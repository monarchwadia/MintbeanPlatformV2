const { Router } = require('express');
// const { requireAdmin } = require('./routers.util');
const { MbConfig, User, MbEvent, Project } = require('../db/models');
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

// for returning sections that include project associations
mbConfigRoute.get('/linked/featured-sections',
  async (req, res, next) => {
    let val;
    // let sections = [];

    await MbConfig.findOne({ where: { configKey: FEATURED_SECTIONS_KEY }})
      .then(config => val = JSON.parse(config.configValue))
      .catch(err => next(err));

    const sections = val.sections.map(s => {
      const title = s.title;
      let projects = [];

        s.projectIds.forEach( async pid => {
          const project = await findProject({
            where: { id: pid },
            include: [
              { model: User },
              { model: MbEvent },
            ]
          })
          console.log(findProject({
            where: { id: pid },
            include: [
              { model: User },
              { model: MbEvent },
            ]
          }))
          projects.push(project)
        })

        console.log(projects)

      return {
        title,
        projects
      }
    })
    console.log(sections)

    res.json(sections)
  }
);

module.exports = mbConfigRoute;
