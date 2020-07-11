const faker = require('faker');
const factory = require('./factory');

module.exports = factory({
  firstname: () => faker.name.firstName(),
  lastname: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  password_hash: () => 'password', // TODO: Change
  createdAt: () => new Date(),
  updatedAt: () => new Date(),
  isAdmin: false
});
