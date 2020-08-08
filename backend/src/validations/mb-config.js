const Joi = require("@hapi/joi");

const keyObj = Joi.object({ key: Joi.string().required() });

module.exports = { keyObj };
