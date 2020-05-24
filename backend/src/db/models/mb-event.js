'use strict';
module.exports = (sequelize, DataTypes) => {
  const MbEvent = sequelize.define('MbEvent', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    cover_image_url: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {});
  MbEvent.associate = function(models) {
    // associations can be defined here
  };
  return MbEvent;
};