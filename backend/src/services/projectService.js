const { Project } = require('../db/models');

const search = (where = {}) => Project.findAll({ where });


module.exports = {
  search
}