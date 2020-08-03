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
      queryInterface.addColumn("confirmed", {
        type: Sequelize.Boolean,
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
