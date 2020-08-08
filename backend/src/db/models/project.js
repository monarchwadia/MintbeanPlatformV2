"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      title: DataTypes.STRING,
      source_code_url: DataTypes.STRING,
      live_url: DataTypes.STRING,
      ratingAverage: {
        type: DataTypes.VIRTUAL(DataTypes.FLOAT),
        get: function() {
          return parseFloat(this.dataValues.ratingAverage);
        }
      },
      ratingCount: {
        type: DataTypes.VIRTUAL(DataTypes.INTEGER),
        get: function() {
          return parseInt(this.dataValues.ratingCount);
        }
      }
    },
    {}
  );
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.MbEvent);
    Project.belongsTo(models.User);
    Project.hasMany(models.Vote);
    Project.belongsToMany(models.MediaAsset, {
      through: models.ProjectMediaAsset
    });
  };
  return Project;
};
