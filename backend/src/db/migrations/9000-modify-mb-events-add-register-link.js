"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "MbEvents", // table name
        "register_link",
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("MbEvents", "register_link")
    ]);
  }
};
