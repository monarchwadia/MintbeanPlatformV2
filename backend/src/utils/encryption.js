const bcrypt = require('bcrypt');
const SALT_ROUNDS =  process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  hash: async password => bcrypt.hash(password, SALT_ROUNDS),
  compare: async (password, hash) => bcrypt.compare(password, hash)
}
