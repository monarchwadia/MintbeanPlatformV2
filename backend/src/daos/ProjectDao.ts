// THIS MODULE FAILING - unable to retrieve hasMany associations as array
import models from "../db/models";
import { ProjectExpl } from "../types/Project";
import { MediaAsset as MediaAssetType } from "../types/MediaAsset";

const {
  Project,
  Vote,
  User,
  MbEvent,
  MediaAsset,
  ProjectMediaAsset,
  sequelize
} = models;

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
const findOneWhere = async (where: object = {}): Promise<ProjectExpl> => {
  // Sequelize note: for nested 1:n associations - use { raw: true, nest: true } IN "include" ASSOCIATION ONLY, not at find*() root. Then take result and execute result.get({plain: true}) for returning only JSON
  return Project.findOne({
    where,
    ...associations
  }).then((p: any) => {
    if (!!p) {
      return p.get({ plain: true });
    }
    return p;
  });
};

// does not return associations
const findAllWhere = async (where: object = {}): Promise<ProjectExpl> => {
  return Project.findAll({
    where
  }).then((p: any) => {
    return p;
  });
};

const findById = async (id: string): Promise<ProjectExpl> =>
  findOneWhere({ id });

// MUTATING DAOS *************************************

interface ProjectParams {
  title: string;
  source_code_url: string;
  live_url: string;
  MediaAssets: Array<MediaAssetType>;
  MbEventId: string;
  UserId: string;
}

const create = (projectParams: ProjectParams) => {
  return new Promise(async (resolve, reject) => {
    const { UserId, MediaAssets } = projectParams;
    let project: any;
    console.log("pre transaction");
    await sequelize.transaction(async (transaction: any) => {
      project = await Project.create(projectParams, { transaction });
      const mediaAssets: Array<MediaAssetType> = await MediaAsset.bulkCreate(
        MediaAssets.map(({ cloudinaryPublicId }) => ({
          cloudinaryPublicId,
          UserId
        })),
        { transaction }
      );
      await ProjectMediaAsset.bulkCreate(
        mediaAssets.map((ma: MediaAssetType) => ({
          MediaAssetId: ma.id,
          ProjectId: project.id,
          UserId
        })),
        { transaction }
      );
      return null;
    });

    try {
      project = await Project.findOne({
        where: { id: project.id },
        ...associations
      }).then((p: any) => p.get({ plain: true }));
      resolve(project);
    } catch (e) {
      reject(e);
    }
  });
};

// NOT TESTED!
// const addMediaAssetsToProject = (
//   projectId: string,
//   mediaAssets: Array<MediaAssetType>
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await sequelize.transaction(async (transaction: any) => {
//         await MediaAsset.bulkCreate(
//           mediaAssets.map(({ cloudinaryPublicId }) => ({
//             cloudinaryPublicId,
//             UserId
//           })),
//           { transaction }
//         );
//         await ProjectMediaAsset.bulkCreate(
//           mediaAssets.map((ma: MediaAssetType) => ({
//             MediaAssetId: ma.id,
//             ProjectId: projectId,
//             UserId
//           })),
//           { transaction }
//         );
//       });
//       resolve(result); // TODO: convert 'result' to standard obj
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

module.exports = {
  // QUERY
  findOneWhere,
  findAllWhere,
  findById,
  // MUTATE
  create
};
