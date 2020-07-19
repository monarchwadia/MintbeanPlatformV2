const faker = require('faker');
const factory = require('./factory');

module.exports = factory({
  title: () => faker.company.bsBuzz() + 'Projects',
  UserId: () => null,
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});
