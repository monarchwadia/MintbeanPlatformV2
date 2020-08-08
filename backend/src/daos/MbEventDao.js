const { MbEvent, Project, User, Vote, MediaAsset } = require("../db/models");

("use strict");
// THE WAY OF DAO
// - first/last point of contact with 'the external' (db, apis, etc)
// - return promises
// - return standardized objects (not raw ORM models)
// - only send bare minimum

// MbEvent object interface (in lieu of typescript for now)
// {
//   id: STRING
//   title: STRING,
//   description: STRING,
//   cover_image_url: STRING,
//   instructions: STRING,
//   start_time: STRING        //  * walltime 'YYYY-MM-DDTHH-MM'
//   end_time: STRING          //  * walltime 'YYYY-MM-DDTHH-MM'
//   register_link: STRING,
//   region: STRING,
//   (for single Event:)
//   Projects: Project[],
// }

// UTILITIES ******************************************
const associations = {
  include: [
    {
      model: Project,
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "password_hash",
              "reset_token",
              "reset_token_created_at",
              "confirmed",
              "confirmation_token"
            ]
          }
        },
        {
          model: Vote
        },
        {
          model: MediaAsset
        }
      ]
    }
  ]
};

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return MbEvent.findOne({
    where,
    raw: true,
    nest: true,
    ...associations
  });
};

// does not return associations
const findAllWhere = (where = {}) => {
  return MbEvent.findAll({
    where,
    raw: true
  });
};

const findById = id => findOneWhere({ id });

// MUTATING DAOS *************************************
const create = event => {
  return MbEvent.create(event).then(raw => raw.get({ raw: true }));
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
