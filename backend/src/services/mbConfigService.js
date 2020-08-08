const MbConfigDao = require("../daos/MbConfigDao");

// transformations
// IN: json => string
// OUT: string => JSON

// QUERYING SERVICES ***************************

const findByKey = key => {
  return MbConfigDao.findByKey(key);
};

module.export = {
  findByKey
};