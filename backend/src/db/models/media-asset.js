'use strict';
module.exports = (sequelize, DataTypes) => {
  const MediaAsset = sequelize.define('MediaAsset', {
    cloudinaryPublicId: DataTypes.STRING
  }, {});
  MediaAsset.associate = function(models) {
    // associations can be defined here
    MediaAsset.belongsTo(models.User);
    MediaAsset.belongsToMany(models.Project, { through: models.ProjectMediaAsset });
  };
  return MediaAsset;
};