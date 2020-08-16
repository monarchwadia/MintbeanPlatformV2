const path = require("path");
const { defaults } = require("jest-config");

require("dotenv").config({
  path: path.join(__dirname, "test", ".env.test")
});

// jest.config.js
module.exports = {
  verbose: false,
  // testMatch: [
  //   "**/__tests__/**/*.+(ts|tsx|js)",
  //   "**/?(*.)+(spec|test).+(ts|tsx|js)"
  // ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
};
