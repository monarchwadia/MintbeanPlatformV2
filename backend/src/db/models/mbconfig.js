'use strict';
module.exports = (sequelize, DataTypes) => {
  const MbConfig = sequelize.define('MbConfig', {
    configKey: DataTypes.STRING,
    configValue: DataTypes.TEXT
  }, {});
  MbConfig.associate = function(models) {
    // associations can be defined here
  };

  // MbConfig.prototype.serialize = function(json) {
  //   JSON.stringify(json);
  // }
  //
  // MbConfig.prototype.deserialize = function(json) {
  //   JSON.parse(json);
  // }

  return MbConfig;
};
