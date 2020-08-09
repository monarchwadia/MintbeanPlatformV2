const { User } = require("../db/models");
("use strict");

// public User object interface (in lieu of typescript for now)
// {
//   firstname: STRING,
//   lastname: STRING,
//   email: STRING,
//   linkedin_id: STRING,
//   github_id: STRING,
//   twitter_id: STRING,
//   stackoverflow_id: STRING,
// }

// UTILITIES ******************************************

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return User.findOne({
    where,
    raw: true
  });
};

const findAllWhere = (where = {}) => {
  return User.findAll({
    where,
    raw: true,
    nest: true
  });
};

const findById = id => findOneWhere({ id });

// MUTATING DAOS *************************************
const updateOneWhere = (where = {}, valuesHash = {}) => {
  return User.update(valuesHash, { returning: true, where })
    .then(arr => {
      return arr[1][0];
    })
    .then(obj => {
      if (!!obj) {
        return obj.get({ raw: true });
      }
      return obj;
    });
};

module.exports = { findOneWhere, findAllWhere, findById, updateOneWhere };
