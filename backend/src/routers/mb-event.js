const { Router } = require('express');
// const { requireAuth } = require('./routers.util');
const { MbEvent } = require('../db/models');

const mbEventRoute = new Router();

mbEventRoute.get('/', async (req, res, next) => {
  const start = new Date() - (4 * 24 * 60 * 60 * 1000); // 4 days before
  const end = new Date() + (14 * 24 * 60 * 60 * 1000); // 14 days into the future

  MbEvent.findAll()
    .then(events => res.json(events))
    .catch(err => {
      next(err);
    })
});

module.exports = mbEventRoute;