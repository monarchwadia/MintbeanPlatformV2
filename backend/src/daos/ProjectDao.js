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

// NOT TESTED!
const addMediaAssetsToProject = (projectId, mediaAssets) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await sequelize.transaction(async transaction => {
        const mediaAssets = await MediaAsset.bulkCreate(
          mediaAssets.map(({ cloudinaryPublicId }) => ({
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
      resolve(result); // TODO: convert 'result' to standard obj
    } catch (err) {
      reject(err);
    }
  });
};

const search = bindings => {
  return new Promise(async (resolve, reject) => {
    let sql = `
      SELECT
      p.id AS "id",
      u.id AS "user_id",
      p."title" AS "title",
      p."live_url" AS "live_url",
      mbe."cover_image_url" AS "mbevent_cover_image_url",
      ma."cloudinaryPublicId" AS "cloudinaryPublicId",
      (u."firstname" || ' ' || u."lastname") AS "user_fullname",
      COUNT(v.*) AS "ratingCount",
      TRUNC(AVG(v.rating), 2) AS "ratingAverage"
      FROM "Projects" AS p
      LEFT JOIN "Users" AS u ON p."UserId" = u."id"
      LEFT JOIN "MbEvents" AS mbe ON p."MbEventId" = mbe.id
      LEFT JOIN "Votes" AS v ON v."ProjectId" = p.id
      LEFT JOIN "ProjectMediaAssets" AS pma ON pma."ProjectId" = p.id
      LEFT JOIN "MediaAssets" AS ma ON pma."MediaAssetId" = ma.id
      WHERE 1 = 1
      ${
        bindings.search_query !== undefined
          ? '\
        AND((u."firstname" || \' \' || u."lastname") ILIKE $search_query \
        OR (p."title" ILIKE $search_query)) \
        '
          : ""
      }
      ${
        bindings.filter_userId !== undefined
          ? "AND  u.id = COALESCE($filter_userId, u.id)"
          : ""
      }
      ${
        bindings.filter_mbEventId !== undefined
          ? "AND  mbe.id = COALESCE($filter_mbEventId, mbe.id)"
          : ""
      }
      GROUP BY p."id", u."id", mbe."id", ma."cloudinaryPublicId"
      HAVING 1 = 1
      ${
        bindings.filter_ratingCount_min !== undefined
          ? "AND COUNT(v.*) >= COALESCE($filter_ratingCount_min, 0)"
          : ""
      }
      ${
        bindings.filter_ratingAverage_min !== undefined
          ? "AND  TRUNC(AVG(v.rating), 2) >= COALESCE($filter_ratingAverage_min, 0)"
          : ""
      }
      ORDER BY ${bindings.sort_field} ${bindings.sort_direction}
      LIMIT $limit OFFSET $offset;
      `;

    try {
      const results = await sequelize.query(sql, {
        model: Project,
        mapToModel: true,
        bind: bindings,
        // raw: true,
        // nest: true,  // TODO: why does this not render in frontend when raw: true
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
          }
        ]
      });

      resolve(results); // TODO return standard object (currently sequelize obj)
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
  search,
  // MUTATE
  create,
  addMediaAssetsToProject
};
