"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("MbEvents", "region", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "America/Toronto"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {}
};
