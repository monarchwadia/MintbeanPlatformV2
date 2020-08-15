//app.js
import config from "./utils/config";
import express from "express";
import expressSession from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routers/auth";
import userProfileRoute from "./routers/user-profile";
import mbEventRoute from "./routers/mb-event";
import projectRoute from "./routers/project";
import voteRoute from "./routers/vote";
import mbConfigRoute from "./routers/mb-config";
import initializePassport from "./passport/initialize";

const app = express();
const sessionOptions = { secret: config.appSessionSecret() };

app.use(cookieParser());
app.use(expressSession(sessionOptions)); // TODO: Tune security
app.use(bodyParser.json());

initializePassport(app);

const rootRouter = new express.Router();
rootRouter.use("/auth", authRoute);
rootRouter.use("/user-profile", userProfileRoute);
rootRouter.use("/mb-event", mbEventRoute);
rootRouter.use("/project", projectRoute);
rootRouter.use("/vote", voteRoute);
rootRouter.use("/mb-config", mbConfigRoute);
rootRouter.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Mintbean Platform API"
  });
});

app.use("/api/v1", rootRouter);

// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    console.log(err);
    next(err);
  }
});

export default app;
