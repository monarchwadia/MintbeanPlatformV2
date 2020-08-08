const Joi = require("@hapi/joi");

const id = Joi.object({
  id: Joi.string().required()
});

module.exports = {
  id
};
