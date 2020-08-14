const Joi = require("@hapi/joi");

const keyObj = Joi.object({ key: Joi.string().required() });

const mbConfigObj = Joi.object({
  id: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  configKey: Joi.string().required(),
  configValue: Joi.object({
    sections: Joi.array().items(
      Joi.object({
        title: Joi.string()
          .required()
          .min(1),
        projectIds: Joi.array()
          .min(1)
          .items(Joi.string().required())
      })
    )
  })
});

const patchMbConfig = Joi.object({
  configValue: [Joi.string().required(), Joi.object()]
});

module.exports = { keyObj, mbConfigObj, patchMbConfig };
