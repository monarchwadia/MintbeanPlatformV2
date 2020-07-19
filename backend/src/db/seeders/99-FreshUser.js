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

    // create admin@mintbean.io
    await User.create(userFactory.one({
      email: 'admin@mintbean.io',
      isAdmin: true,
      password_hash: TEST_PASSWORD
    }));
  },
};
