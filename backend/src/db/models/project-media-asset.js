'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectMediaAsset = sequelize.define('ProjectMediaAsset', {

  }, {});
  ProjectMediaAsset.associate = function(models) {
    // associations can be defined here
    ProjectMediaAsset.belongsTo(models.MediaAsset);
    ProjectMediaAsset.belongsTo(models.Project);
  };
  return ProjectMediaAsset;
};