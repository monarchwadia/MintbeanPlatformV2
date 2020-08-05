const dates = require("../../utils/dates.js");

("use strict");
// * wall clock time: the date and hour a person would see on a clock in given region.
// a forced UTC time stamp stores the wall clock time verbatum, which is parsed to wall clock time of given region on retrieval
// ex: "America/Toronto" event 2020, aug 6, 12:00pm  => stored as TIMESTAMP "2020-08-06T12:00:00Z" => retrieved as date reflecting 2020, aug 6, 12:00pm in "America/Toronto"

module.exports = (sequelize, DataTypes) => {
  const MbEvent = sequelize.define(
    "MbEvent",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      cover_image_url: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
      start_time: DataTypes.DATE, // * wall clock time
      end_time: DataTypes.DATE, //  * wall clock time
      register_link: DataTypes.STRING,
      region: DataTypes.STRING
    },
    {}
  );
  MbEvent.associate = function(models) {
    MbEvent.hasMany(models.Project);
    // associations can be defined here
  };

  // MbEvent.beforeCreate(mbEvent => mbEvent.id = uuid());
  // MbEvent.prototype.setTimeForResponse = function({ start, end }) {
  //   this.start_time = dates.toDatetimeStr(start);
  //   this.end_time = dates.toDatetimeStr(end);
  //   return this;
  // };
  // MbEvent.prototype.setTimeForStorage = function({ start, end }) {
  //   this.start_time = dates.toWallclockTime(start);
  //   this.end_time = dates.toWallclockTime(end);
  //   return this;
  // };

  return MbEvent;
};
