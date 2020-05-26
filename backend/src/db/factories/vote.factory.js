const faker = require('faker');
const factory = require('./factory');
// const { User, MbEvent } = require('../models');
// const mbEventFactory = require('./mb-event.factory');
// const userFactory = require('./user.factory');

module.exports = factory({
  UserId: () => null,
  ProjectId: () => null,
  comment: () => faker.lorem.paragraph(),
  rating: () => faker.random.number(9) + 1,
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});
