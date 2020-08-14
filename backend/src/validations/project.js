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

const VALID_SORT_DIRECTIONS = {
  desc: "desc",
  asc: "asc"
};
const VALID_SORT_FIELDS = {
  CREATED_AT: 'p."createdAt"',
  RATING_AVERAGE: "TRUNC(AVG(v.rating), 2)",
  RATING_COUNT: "COUNT(v.*)"
};

const projectSearchQuery = Joi.object({
  search_query: Joi.string()
    .optional()
    .default("")
    .allow(""),
  filter_userId: Joi.string()
    .uuid()
    .min(1)
    .optional(),
  filter_mbEventId: Joi.string()
    .uuid()
    .min(1)
    .optional(),
  filter_ratingAverage_min: Joi.number()
    .min(0)
    .max(10)
    .optional(),
  filter_ratingCount_min: Joi.number()
    .min(0)
    .optional(),
  sort_direction: Joi.string()
    .valid(...Object.keys(VALID_SORT_DIRECTIONS))
    .optional()
    .default("desc"),
  sort_field: Joi.string()
    .valid(...Object.keys(VALID_SORT_FIELDS))
    .optional()
    .default("RATING_AVERAGE"),
  limit: Joi.number()
    .max(100)
    .optional()
    .default(25),
  offset: Joi.number()
    .min(0)
    .optional()
    .default(0)
});

module.exports = {
  createProject,
  uploadMediaAssets,
  deleteMediaAsset,
  projectSearchQuery
};
