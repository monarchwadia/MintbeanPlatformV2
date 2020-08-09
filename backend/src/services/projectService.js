// THIS MODULE FAILING - DAO unable to retrieve hasMany associations as array

const ProjectDao = require("../daos/ProjectDao");

const search = (where = {}) => ProjectDao.findAllWhere(where);
// const findWhere = (where = {}) => ProjectDao.findOne({ where });
// const find = (options = {}) => ProjectDao.findOne(options);
const findById = id => ProjectDao.findById(id);

const create = projectParams => {
  // check if user already submitted project
  // => if yes, return 402 "project already submitted"

  return ProjectDao.create(projectParams);
};
module.exports = {
  search,
  findById,
  create
};
