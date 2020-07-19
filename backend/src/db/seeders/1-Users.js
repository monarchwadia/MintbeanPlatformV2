'use strict';

const { User } = require('../models');

const userFactory = require('../factories/user.factory');

const TEST_EMAIL = "user$@mintbean.io";
const TEST_PASSWORD = "password";

module.exports = {
  up:  async (queryInterface, Sequelize) => {
    // create user1, user2, user3...@mintbean.io
    const users = userFactory.bulk(10);
    for (var i = 1; i <= 9; i++) {
      const u = users[i];
      u.email = TEST_EMAIL.replace('$', i);
      u.password_hash = TEST_PASSWORD; // TODO: change
    }

    await User.bulkCreate(users);
  },
};
