//app.js
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const initializePassport = require('./passport/initialize');

const authRoute = require('./routers/auth');
const userRoute = require('./routers/user');

initializePassport(app);

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.get("/", (req, res) => {
  res.json({
    message: 'hello world'
  })
});

module.exports = app;
