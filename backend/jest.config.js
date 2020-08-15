const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "test", ".env.test")
});

// jest.config.js
module.exports = {
  verbose: false
  // preset: "ts-jest"
};
