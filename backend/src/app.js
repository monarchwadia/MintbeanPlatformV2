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


module.exports = app;
