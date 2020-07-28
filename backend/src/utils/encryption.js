const config = require("../utils/config");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = config.bcryptSaltRounds();

module.exports = {
  hash: async password => bcrypt.hash(password, SALT_ROUNDS),
  compare: async (password, hash) => bcrypt.compare(password, hash),
  objToBase64: obj => Buffer.from(JSON.stringify(obj)).toString("base64")
};
