const Joi = require("@hapi/joi");

const eventPlain = Joi.object({
  title: Joi.string()
    .min(1)
    .required(),
  description: Joi.string()
    .min(1)
    .required(),
  cover_image_url: Joi.string()
    .uri()
    .min(1)
    .required(),
  instructions: Joi.string()
    .min(1)
    .required(),
  register_link: Joi.string()
    .min(1)
    .required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  region: Joi.string()
    .min(1)
    .required()
});

module.exports = { eventPlain };
