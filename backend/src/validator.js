const expressJoiValidation = require('express-joi-validation');

module.exports = expressJoiValidation.createValidator({
  // This options forces validation to pass any errors the express
  // error handler instead of generating a 400 error
  passError: true
});
