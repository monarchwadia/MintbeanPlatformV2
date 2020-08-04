"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "confirmation_token",
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn("Users", "confirmed", {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "confirmation_token"),
      queryInterface.removeColumn("Users", "confirmed")
    ]);
  }
};
