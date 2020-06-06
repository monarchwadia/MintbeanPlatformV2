const faker = require('faker');
const factory = require('./factory');

module.exports = factory({
  // id: () => uuid(),
  cloudinaryPublicId: () => "bo3bpbanohqsbf3bzc9c",
  UserId: () => null,
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});
