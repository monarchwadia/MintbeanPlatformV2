'use strict';

const mbEventFactory = require('../factories/mb-event.factory');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = mbEventFactory.bulk(10);

    return queryInterface.bulkInsert('MbEvents', users);

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
