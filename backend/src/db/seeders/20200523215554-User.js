'use strict';

const userFactory = require('../factories/user.factory');

const TEST_EMAIL = "user@mintbean.io";
const TEST_PASSWORD = "password";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = userFactory.bulk(10);

    // setup test user
    users[0].email = TEST_EMAIL;
    users[0].password_hash = TEST_PASSWORD; // TODO: change

    return queryInterface.bulkInsert('Users', users);

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
