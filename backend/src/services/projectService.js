// THIS MODULE FAILING - DAO unable to retrieve hasMany associations as array

const ProjectDao = require("../daos/ProjectDao");

const search = (where = {}) => ProjectDao.findAllWhere({ where });
// const findWhere = (where = {}) => ProjectDao.findOne({ where });
// const find = (options = {}) => ProjectDao.findOne(options);
const findById = id => ProjectDao.findById(id);

module.exports = {
  search,
  findById
};
