const { Router } = require('express');
const passport = require('passport');

const userRoute = new Router();

userRoute.get('/', 
  (req, res) => {
    // res.json(req.user)
    res.json({ username: 'username' })
  }
);

module.exports = userRoute;