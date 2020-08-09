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

module.exports = { findOneWhere, findAllWhere, findById };
