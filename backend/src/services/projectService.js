// TODO: move this to a Dao where it belongs
const { Project } = require("../db/models");

const search = (where = {}) => Project.findAll({ where });
const findWhere = (where = {}) => Project.findOne({ where });
const find = (options = {}) => Project.findOne(options);

module.exports = {
  search,
  findWhere,
  find
};
