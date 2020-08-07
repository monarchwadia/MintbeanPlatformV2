"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "MbEvents", // table name
        "start_time",
        {
          type: "TIMESTAMP",
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        "MbEvents", // table name
        "end_time",
        {
          type: "TIMESTAMP",
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        "MbEvents", // table name
        "region",
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "America/Toronto"
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("MbEvents", "region")]);
  }
};
