'use strict';
module.exports = (sequelize, DataTypes) => {
  const MbConfig = sequelize.define('MbConfig', {
    configKey: DataTypes.STRING,
    configValue: DataTypes.STRING
  }, {});
  MbConfig.associate = function(models) {
    // associations can be defined here
  };
  return MbConfig;
};