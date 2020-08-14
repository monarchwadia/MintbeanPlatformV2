const Joi = require("@hapi/joi");

const createProject = Joi.object({
  title: Joi.string()
    .min(1)
    .required(),
  source_code_url: Joi.string()
    .min(1)
    .uri()
    .required(),
  live_url: Joi.string()
    .min(1)
    .uri()
    .required(),
  MbEventId: Joi.string()
    .min(1)
    .uuid()
    .required(),
  MediaAssets: Joi.array()
    .items(
      Joi.object({
        cloudinaryPublicId: Joi.string()
          .min(5)
          .max(20)
          .required()
      })
    )
    .min(1)
    .max(5)
    .required()
});

const uploadMediaAssets = Joi.object({
  ProjectId: Joi.string()
    .uuid()
    .required(),
  MediaAssets: Joi.array()
    .items(
      Joi.object({
        cloudinaryPublicId: Joi.string()
          .min(5)
          .max(20)
          .required()
        // UserId: Joi.string().required()
      })
    )
    .required()
    .min(1)
    .max(1)
});

const deleteMediaAsset = Joi.object({
  ProjectId: Joi.string()
    .uuid()
    .required(),
  MediaAssetId: Joi.string()
    .uuid()
    .required()
});
module.exports = { createProject, uploadMediaAssets, deleteMediaAsset };
