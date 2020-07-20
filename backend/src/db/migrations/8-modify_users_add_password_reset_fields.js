"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "reset_token",
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn("Users", "reset_token_created_at", {
        type: Sequelize.DATE,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "reset_token_created_at"),
      queryInterface.removeColumn("Users", "reset_token")
    ]);
  }
};
