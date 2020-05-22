const { Router } = require('express');
const passport = require('passport');

const authRoute = new Router();

authRoute.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({user: req.user})
});

module.exports = authRoute;