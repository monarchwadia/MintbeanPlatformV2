const { Router } = require('express');
const passport = require('passport');
const Joi = require('@hapi/joi');
const validator = require('../validator');
const { User } = require('../db/models');

const { requireAuth } = require('./routers.util');

const authRoute = new Router();

authRoute.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

authRoute.post('/logout', requireAuth, (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

authRoute.post('/register', validator.body(Joi.object({
  email: Joi.string().required().min(8).max(32),
  password: Joi.string().required().min(8).max(64),
  firstname: Joi.string().required().max(255),
  lastname: Joi.string().required().max(255),
})), async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: 'Registration failed: You are already signed in. Try signing out first.' });
  }

  const { email, password, firstname, lastname } = req.body;

  let user;
  try {
    user = await User.findOne({ where: { email }});
  } catch (e) {
    next(e);
  }

  if (user) {
    return res.status(422).json({ message: 'User with that email address already exists' })
  }

  try {
    user = await User.create({ email, password_hash: password, firstname, lastname });
  } catch (e) {
    next(e);
  }

  req.login(user, (err) => {
    if (err) {
      next(err);
    } else {
      return res.json(user);
    }
  });
})

authRoute.get('/self', requireAuth, (req, res) => res.json(req.user));

module.exports = authRoute;