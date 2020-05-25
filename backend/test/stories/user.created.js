const { createUser, destroyUsers, donify } = require('../test.util');

module.exports.beforeEach = done => donify(createUser(), done);
module.exports.afterEach = done => donify(destroyUsers(), done);