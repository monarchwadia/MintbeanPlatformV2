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
const findOneWhere = (where = {}) =>
  MbEvent.findOne({
    where,
    raw: true,
    nest: true,
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
  });
const findById = id => findOneWhere({ id });

// const find = (options = {}) => MbEvent.findOne(options);

module.exports = {
  findOneWhere,
  findById
  // find
};
