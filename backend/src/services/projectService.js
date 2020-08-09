const ProjectDao = require("../daos/ProjectDao");

// QUERYING ***************************************************
const search = (where = {}) => ProjectDao.findAllWhere(where);
const findById = id => ProjectDao.findById(id);

// MUTATING ***************************************************
const create = projectParams => {
  return new Promise(async (resolve, reject) => {
    const { UserId } = projectParams;
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

module.exports = {
  search,
  findById,
  create
};
