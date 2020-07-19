'use strict';

const mbEventFactory = require('../factories/mb-event.factory');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const events = mbEventFactory.bulk(10);

    return queryInterface.bulkInsert('MbEvents', events);
  },
};
