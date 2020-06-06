'use strict';

const { User } = require('../models');
const userFactory = require('../factories/user.factory');
const TEST_PASSWORD = "password";

module.exports = {
  up:  async (queryInterface, Sequelize) => {
    // create user@mintbean.io
    await User.create(userFactory.one({
      email: 'user@mintbean.io',
      password_hash: TEST_PASSWORD
    }));

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
