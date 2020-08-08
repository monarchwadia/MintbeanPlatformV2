const { MbEvent, Project, User, Vote, MediaAsset } = require("../db/models");

("use strict");
// HOW TO DAO
// - return promises
// - return standardized objects (not raw models)
// - only send bare minimum

// MbEvent object interface:
// {
//   title: STRING,
//   description: STRING,
//   cover_image_url: STRING,
//   instructions: STRING,
//   start_time: STRING        //  * wall clock 'YYYY-MM-DDTHH-MM'
//   end_time: STRING          //  * wall clock 'YYYY-MM-DDTHH-MM'
//   register_link: STRING,
//   region: STRING,
//   Projects: Project[],
// }

// const findAllWhere = (where = {}) => MbEvent.findAll({ where });
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

const findOneWhere = (where = {}) => {
  return MbEvent.findOne({
    where,
    raw: true,
    nest: true,
    ...associations
  });
};

// TODO: find out why this returns over 400 records... (expect 10 in seeds)
const findAllWhere = (where = {}) => {
  return MbEvent.findAll({
    where,
    raw: true,
    nest: true,
    ...associations,
    group: [
      "MbEvent.id",
      "Projects.id",
      "Projects.User.id",
      "Projects.MediaAssets.id",
      "Projects.MediaAssets.ProjectMediaAsset.id",
      "Projects.Votes.id"
    ],
    subQuery: false
  }).then(d => {
    console.log(d.length);
    return d;
  });
};

const findById = id => findOneWhere({ id });

module.exports = {
  findOneWhere,
  findById,
  findAllWhere
};
