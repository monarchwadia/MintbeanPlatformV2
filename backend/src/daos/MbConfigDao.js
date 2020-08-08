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
// }

// UTILITIES ******************************************

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return MbConfig.findOne({
    where,
    raw: true,
    nest: true
  }).then(c => {
    console.log(c);
    return c;
  });
};

const findByKey = key => findOneWhere({ configKey: key });

// MUTATING DAOS *************************************
// const create = event => {
//   return MbEvent.create(event).then(raw => raw.get({ raw: true }));
// };

module.exports = {
  // QUERY
  findOneWhere,
  // findAllWhere,
  findByKey
  // MUTATE
  // create
};
