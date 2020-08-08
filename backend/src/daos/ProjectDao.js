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
      include: [
        {
          model: User,
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
    { model: MediaAsset },
    { model: MbEvent }
  ]
};

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return Project.findAll({
    where,
    raw: true,
    nest: true,
    ...associations
  });
};

// does not return associations
const findAllWhere = (where = {}) => {
  return Project.findAll({
    where
    // raw: true,
    // nest: true
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

// save for now:
// group: [
//   "MbEvent.id",
//   "Projects.id",
//   "Projects.User.id",
//   "Projects.MediaAssets.id",
//   "Projects.MediaAssets.ProjectMediaAsset.id",
//   "Projects.Votes.id"
// ],
