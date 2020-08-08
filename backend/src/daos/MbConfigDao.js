const { MbConfig } = require("../db/models");
("use strict");

// THE WAY OF DAO
// - first/last point of contact with 'the external' (db, apis, etc)
// - return promises
// - return standardized objects (not raw ORM models)
// - only send bare minimum

// MbConfig object interface (in lieu of typescript for now)
// {
//   id: STRING
//   configKey: STRING,
//   configValue: STRING
//   updatedAt: STRING
//   createdAt: STRING
// }

// UTILITIES ******************************************
function hasJsonStructure(str) {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === "[object Object]" || type === "[object Array]";
  } catch (err) {
    return false;
  }
}

const objWithParsedConfigValue = obj => {
  const isJ = hasJsonStructure(obj.configValue);
  return {
    ...obj,
    configValue: hasJsonStructure(obj.configValue)
      ? JSON.parse(obj.configValue)
      : obj.configValue
  };
};

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return MbConfig.findOne({
    where,
    raw: true,
    nest: true
  }).then(obj => {
    return objWithParsedConfigValue(obj);
  });
};

const findByKey = key => findOneWhere({ configKey: key });

// MUTATING DAOS *************************************
const updateWhere = (where = {}, val) => {
  // stringify configValue if is obj
  const strVal = typeof val === "object" ? JSON.stringify(val) : val;
  return MbConfig.update({ configValue: strVal }, { returning: true, where })
    .then(arr => {
      return arr[1][0];
    })
    .then(obj => {
      return objWithParsedConfigValue(obj.get({ raw: true }));
    });
};

const updateByKey = (key, val) => {
  return updateWhere({ configKey: key }, val);
};

module.exports = {
  // QUERY
  findOneWhere,
  // findAllWhere,
  findByKey,
  // MUTATE
  updateWhere,
  updateByKey
};
