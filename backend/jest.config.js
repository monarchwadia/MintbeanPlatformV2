const path = require("path");
// const { defaults } = require("jest-config");
// const { defaults: tsjPreset } = require("ts-jest/presets");

require("dotenv").config({
  path: path.join(__dirname, "test", ".env.test")
});

// jest.config.js
module.exports = {
  verbose: false,
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  preset: "ts-jest"
  // testMatch: [
  //   "**/__tests__/**/*.+(ts|tsx|js)",
  //   "**/?(*.)+(spec|test).+(ts|tsx|js)"
  // ],
  // transform: {
  //   ...tsjPreset.transform
  //   // [...]
  // },
};
