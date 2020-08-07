const faker = require("faker");
const factory = require("./factory");

module.exports = factory({
  // id: () => uuid(),
  title: () => faker.company.bs(),
  description: () => faker.lorem.paragraph(),
  cover_image_url: () =>
    "https://picsum.photos/600/300?random=" + Math.random(),
  instructions: () => faker.lorem.paragraphs(2),
  start_time: () =>
    faker.date.between(
      new Date(+new Date() - 96 * 60 * 60 * 1000),
      new Date(+new Date() + 96 * 60 * 60 * 1000)
    ),
  end_time: model => new Date(+model.start_time + 4 * 60 * 60 * 1000),
  register_link:
    "https://www.eventbrite.com/e/selfless-hackers-covid-19-2-day-hackathon-tickets-101683403798?aff=erelexpmlt",
  createdAt: () => new Date(),
  updatedAt: () => new Date(),
  region: "America/Toronto"
});
