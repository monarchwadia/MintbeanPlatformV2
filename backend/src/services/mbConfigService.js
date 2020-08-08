const MbConfigDao = require("../daos/MbConfigDao");

// transformations
// IN: json => string
// OUT: string => JSON

// QUERYING SERVICES ***************************

const findByKey = key => {
  return MbConfigDao.findByKey(key);
};

// MUTATING SERVICES ***************************
const updateByKey = (key, val) => {
  return MbConfigDao.updateByKey(key, val);
};

module.exports = {
  findByKey,
  updateByKey
};
