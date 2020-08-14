const { ProjectMediaAsset } = require("../db/models");
("use strict");

// ProjectMediaAsset object interface (in lieu of typescript for now)
// {
//   id: STRING
//   MediaAssetId: STRING,
//   ProjectId: STRING,
//   updatedAt: STRING,
//   createdAt: STRING
// }

// UTILITIES ******************************************

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return ProjectMediaAsset.findOne({
    where,
    raw: true
  });
};

// const findAllWhere = (where = {}) => {
//   return ProjectMediaAsset.findAll({
//     where,
//     raw: true,
//     nest: true
//   });
// };

// MUTATING DAOS *************************************

module.exports = { findOneWhere };
