"use strict";
module.exports = (sequelize, DataTypes) => {
  const MbEvent = sequelize.define(
    "MbEvent",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      cover_image_url: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      register_link: DataTypes.STRING
    },
    {}
  );
  MbEvent.associate = function(models) {
    MbEvent.hasMany(models.Project);
    // associations can be defined here
  };

  // MbEvent.beforeCreate(mbEvent => mbEvent.id = uuid());

  return MbEvent;
};
