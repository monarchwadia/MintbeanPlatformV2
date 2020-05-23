//app.js
const express = require("express");
const bodyParser = require('body-parser');

const initializePassport = require('./passport/initialize');

const app = express();
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
