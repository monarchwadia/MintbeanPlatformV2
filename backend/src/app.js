//app.js
const express = require("express");
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const initializePassport = require('./passport/initialize');

const app = express();
const sessionOptions = { secret: process.env.SESSION_SECRET || 'password' };

app.use(cookieParser());
app.use(expressSession(sessionOptions)); // TODO: Tune security
app.use(bodyParser.json());

initializePassport(app);

const authRoute = require('./routers/auth');
const userRoute = require('./routers/user');


app.use('/auth', authRoute);
app.use('/user', userRoute);

app.get("/", (req, res) => {
  res.json({
    message: 'Welcome to the Mintbean Platform API'
  })
});

module.exports = app;
