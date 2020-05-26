'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    UserId: DataTypes.UUID,
    ProjectId: DataTypes.UUID,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.Project);
    Vote.belongsTo(models.User);
    // associations can be defined here
  };
  return Vote;
};