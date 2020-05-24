//app.js
const express = require("express");
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoute = require('./routers/auth');
const userRoute = require('./routers/user');
const mbEventRoute = require('./routers/mb-event');
const initializePassport = require('./passport/initialize');

const app = express();
const sessionOptions = { secret: process.env.SESSION_SECRET || 'password' };

app.use(cookieParser());
app.use(expressSession(sessionOptions)); // TODO: Tune security
app.use(bodyParser.json());

initializePassport(app);

const rootRouter = new express.Router();
rootRouter.use('/auth', authRoute);
rootRouter.use('/user', userRoute);
rootRouter.use('/mb-event', mbEventRoute);
rootRouter.get("/", (req, res) => {
  res.json({
    message: 'Welcome to the Mintbean Platform API'
  })
});

app.use('/api/v1', rootRouter);

// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    console.log("DEBUG inside error handler middleware", req.body);
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
  }
});


module.exports = app;
