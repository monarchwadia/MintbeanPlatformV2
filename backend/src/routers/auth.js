const { Router } = require('express');
const passport = require('passport');

const { requireAuth } = require('./routers.util');

const authRoute = new Router();

authRoute.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

authRoute.post('/logout', requireAuth, (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

authRoute.get('/self', requireAuth, (req, res) => res.json(req.user));

module.exports = authRoute;