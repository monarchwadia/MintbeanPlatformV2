// THIS MODULE FAILING - unable to retrieve hasMany associations as array
const {
  Project,
  Vote,
  User,
  MbEvent,
  MediaAsset,
  ProjectMediaAsset
} = require("../db/models");
const { sequelize } = require("../db/models");
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
// ratingCount: NUMBER,
// MbEventId: STRING,
// UserId: String,
// MbEvent: MbEvent,
// User: User,
// MediaAssets: MediaAsset[]
// Votes: Vote[],
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
  }).then(p => {
    if (!!p) {
      return p.get({ plain: true });
    }
    return p;
  });
};

// does not return associations
const findAllWhere = (where = {}) => {
  return Project.findAll({
    where
  }).then(p => {
    return p;
  });
};

const findById = id => findOneWhere({ id });

// MUTATING DAOS *************************************

// projectParams shape: { title, source_code_url, live_url, mb_event_id, MbEventId, UserId }
const create = projectParams => {
  return new Promise(async (resolve, reject) => {
    const { UserId } = projectParams;
    let project;

    const result = await sequelize.transaction(async transaction => {
      project = await Project.create({ ...projectParams }, { transaction });
      const mediaAssets = await MediaAsset.bulkCreate(
        MediaAssets.map(({ cloudinaryPublicId }) => ({
          cloudinaryPublicId,
          UserId
        })),
        { transaction }
      );
      const projectMediaAssets = await ProjectMediaAsset.bulkCreate(
        mediaAssets.map((ma, i) => ({
          MediaAssetId: ma.id,
          ProjectId: project.id,
          UserId
        })),
        { transaction }
      );
    });

    try {
      project = await Project.findOne({
        where: { id: project.id },
        ...associations
      }).then(p => p.get({ plain: true }));
      resolve(project);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  // QUERY
  findOneWhere,
  findAllWhere,
  findById,
  // MUTATE
  create
};
