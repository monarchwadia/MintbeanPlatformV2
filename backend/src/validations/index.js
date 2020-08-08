const common = require("./common");
const mbEvent = require("./mb-event");
const mbConfig = require("./mb-config");

module.exports = {
  common: { ...common },
  mbEvent: { ...mbEvent },
  mbConfig: { ...mbConfig }
};
