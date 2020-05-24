const faker = require('faker');
const factory = require('./factory');
// const { User, MbEvent } = require('../models');
// const mbEventFactory = require('./mb-event.factory');
// const userFactory = require('./user.factory');

module.exports = factory({
  title: () => faker.company.bsBuzz(),
  source_code_url: () => faker.internet.url(),
  live_url: () => faker.internet.url(),
  User: () => null,
  MbEvent: () => null,
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});
