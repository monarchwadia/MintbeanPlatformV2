const { User } = require("../src/db/models");
const userFactory = require("../src/db/factories/user.factory");
const { TEST_EMAIL, TEST_PASSWORD } = require("./test.constants");

const createUser = () =>
  User.create(
    userFactory.one({
      email: TEST_EMAIL,
      password_hash: TEST_PASSWORD
    })
  );

const destroyUsers = () => User.destroy({ where: {} });

const donify = (promise, done) => {
  promise
    .then(response => done(null, response))
    .catch(err => {
      console.log(err);
      done(err);
    });
};

const base64ToObj = function(base64) {
  let obj;
  try {
    obj = JSON.parse(Buffer.from(base64, "base64").toString());
  } catch {
    return null;
  }
  return obj;
};

module.exports = {
  createUser,
  destroyUsers,
  donify,
  base64ToObj
};
