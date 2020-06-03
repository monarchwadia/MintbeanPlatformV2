'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    source_code_url: DataTypes.STRING,
    live_url: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.MbEvent);
    Project.belongsTo(models.User);
    Project.hasMany(models.Vote);
    Project.belongsToMany(models.MediaAsset, { through: models.ProjectMediaAsset });
  };
  return Project;
};
