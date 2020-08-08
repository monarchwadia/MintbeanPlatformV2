const MbConfigDao = require("../daos/MbConfigDao");

// QUERYING SERVICES ***************************

const findByKey = key => {
  return MbConfigDao.findByKey(key);
};

const getAscFeaturedSectionsArr = () => {
  return MbConfigDao.getAscFeaturedSectionsArr();
};

// MUTATING SERVICES ***************************
const updateByKey = (key, val) => {
  return MbConfigDao.updateByKey(key, val);
};

module.exports = {
  findByKey,
  updateByKey,
  getAscFeaturedSectionsArr
};
