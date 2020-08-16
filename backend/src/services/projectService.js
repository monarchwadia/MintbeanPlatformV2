const ProjectDao = require("../daos/ProjectDao");
const ProjectMediaAssetDao = require("../daos/ProjectMediaAssetDao");

// QUERYING ***************************************************
const search = (where = {}) => ProjectDao.findAllWhere(where);
const findById = id => ProjectDao.findById(id);

// MUTATING ***************************************************
const create = projectParams => {
  return new Promise(async (resolve, reject) => {
    const { UserId, MbEventId } = projectParams;
    let existingProject;
    try {
      existingProject = await ProjectDao.findOneWhere({
        UserId,
        MbEventId
      });
    } catch (e) {
      reject(e);
    }

    if (existingProject) {
      reject("You have already submitted a project to this event.");
    }

    resolve(ProjectDao.create(projectParams));
  });
};

// NOT TESTED!
// const addMediaAssetsToProject = (projectId, mediaAssets) => {
//   return ProjectDao.addMediaAssetsToProject(projectId, mediaAssets);
// };
// NOT TESTED!
// const deleteProjectMediaAsset = (ProjectId, MediaAssetId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const projectMediaAsset = await ProjectMediaAssetDao.findOneWhere({
//         where: { ProjectId, MediaAssetId }
//       });
//
//       if (!projectMediaAsset) {
//         reject("No such assets found");
//       } else {
//         await ProjectMediaAssetDao.deleteById(projectMediaAsset.id);
//         resolve("OK");
//       }
//     } catch {
//       reject(
//         `Error while deleting media asset, ProjectId=[${ProjectId}] MediaAssetId=[${MediaAssetId}]`
//       );
//     }
//   });
// };

module.exports = {
  // QUERY
  search,
  findById,
  // MUTATE
  create
};
