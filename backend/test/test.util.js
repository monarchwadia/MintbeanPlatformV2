const { User } = require('../src/db/models');
const userFactory = require('../src/db/factories/user.factory');
const { TEST_EMAIL, TEST_PASSWORD } = require('./test.constants');

const createUser = () => User.create(userFactory.one({
    email: TEST_EMAIL,
    password_hash: TEST_PASSWORD
  }));

const destroyUser = () => User.destroy({ where: {email: TEST_EMAIL}});

const donify =  (promise, done) => {
  promise
    .then(response => done(null, response))
    .catch(err => {
      console.log(err);
      done(err);
    })
}

module.exports = {
  createUser,
  destroyUser,
  donify
}