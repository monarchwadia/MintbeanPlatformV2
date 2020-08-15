require("dotenv").config();

import configUtil from "./src/utils/config";

import * as app from "./src/app";

process.on("unhandledRejection", (reason: any, p: any) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  console.dir(reason.stack);
  // application specific logging, throwing an error, or other logic here
});

const appPort = configUtil.appPort();

console.log("APP PORT IS", appPort);

const listener = app.listen(appPort, () => {
  console.log("App listening on port:", listener.address().port);
});
