const Joi = require("@hapi/joi");

const tokenObj = Joi.object({
  tokenObj: Joi.object({
    email: Joi.string().required(),
    token: Joi.string().required()
  })
});

module.exports = {
  tokenObj
};
