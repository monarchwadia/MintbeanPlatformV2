// THIS MODULE FAILING - unable to retrieve hasMany associations as array
const { Project, Vote, User, MbEvent, MediaAsset } = require("../db/models");

("use strict");
// THE WAY OF DAO
// - first/last point of contact with 'the external' (db, apis, etc)
// - return promises
// - return standardized objects (not raw ORM models)
// - only send bare minimum

// Project object interface (in lieu of typescript for now)
// {
// id: STRING
// title: STRING,
// source_code_url: STRING,
// live_url: STRING,
// ratingAverage: NUMBER
// ratingCount: NUMBER
// }

// UTILITIES ******************************************
const associations = {
  include: [
    {
      model: Vote,
      raw: true,
      nest: true,
      include: [
        {
          model: User,
          raw: true,
          nest: true,
          attributes: {
            exclude: [
              "password_hash",
              "reset_token",
              "reset_token_created_at",
              "confirmation_token",
              "confirmed"
            ]
          }
        }
      ]
    },
    {
      model: User,
      raw: true,
      nest: true,
      attributes: {
        exclude: [
          "password_hash",
          "reset_token",
          "reset_token_created_at",
          "confirmation_token",
          "confirmed"
        ]
      }
    },
    { model: MediaAsset, raw: true, nest: true },
    { model: MbEvent, raw: true, nest: true }
  ]
};

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  // Sequelize note: for nested 1:n associations - use { raw: true, nest: true } IN "include" ASSOCIATION ONLY, not at find*() root. Then take result and execute result.get({plain: true}) for returning only JSON
  return Project.findOne({
    where,
    ...associations
  }).then(p => p.get({ plain: true }));
};

// does not return associations
const findAllWhere = (where = {}) => {
  return Project.findAll({
    where
  }).then(p => {
    console.log(p);
    return p;
  });
};

const findById = id => findOneWhere({ id });

// MUTATING DAOS *************************************
const create = project => {
  return Project.create(project).then(raw => raw.get({ raw: true }));
};

module.exports = {
  // QUERY
  findOneWhere,
  findAllWhere,
  findById,
  // MUTATE
  create
};
