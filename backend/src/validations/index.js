const common = require("./common");
const mbEvent = require("./mb-event");
const mbConfig = require("./mb-config");
const project = require("./project");
const auth = require("./auth");

module.exports = {
  common: { ...common },
  mbEvent: { ...mbEvent },
  mbConfig: { ...mbConfig },
  project: { ...project },
  auth: { ...auth }
};
