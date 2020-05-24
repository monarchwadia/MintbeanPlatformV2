const faker = require('faker');
const factory = require('./factory');

module.exports = factory({
  title: () => faker.name.firstName(),
  description: () => faker.internet.email(),
  cover_image_url: () => faker.name.lastName(),
  instructions: () => faker.lorem.paragraphs(2),
  start_time: () => faker.date.between(new Date(), new Date(+(new Date()) + (96 * 60 * 60 * 1000)) ),
  // start_time: () => ,
  end_time: model => new Date(+(model.start_time) + (4 * 60 * 60 * 1000)),
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});
