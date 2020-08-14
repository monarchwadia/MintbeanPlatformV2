const ProjectDao = require("../daos/ProjectDao");
const ProjectMediaAssetDao = require("../daos/ProjectMediaAssetDao");

// QUERYING ***************************************************
const findById = id => ProjectDao.findById(id);

// MUTATING ***************************************************
const create = projectParams => {
  return new Promise(async (resolve, reject) => {
    const { UserId } = projectParams;
    let existingProject;
    try {
      existingProject = await ProjectDao.findOneWhere({
        UserId,
        MbEventId
      });
    } catch (e) {
      reject(e);
    }

    if (existingProject) {
      reject("You have already submitted a project to this event.");
    }

    resolve(ProjectDao.create(projectParams));
  });
};

// NOT TESTED!
const addMediaAssetsToProject = (projectId, mediaAssets) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = ProjectDao.addMediaAssetsToProject(
        projectId,
        mediaAssets
      );
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};
// NOT TESTED!
const deleteProjectMediaAsset = (ProjectId, MediaAssetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const projectMediaAsset = await ProjectMediaAssetDao.findOneWhere({
        where: { ProjectId, MediaAssetId }
      });

      if (!projectMediaAsset) {
        reject("No such assets found");
      } else {
        const deleted = await projectMediaAsset.destroy();
        resolve(deleted);
      }
    } catch {
      reject(
        `Error while deleting media asset, ProjectId=[${ProjectId}] MediaAssetId=[${MediaAssetId}]`
      );
    }
  });
};

// search queryObj example:
// {
//   filter_mbEventId: 'b539e709-b630-424b-b032-30d603500049',
//   filter_ratingCount_min: 0,
//   sort_direction: 'desc',
//   sort_field: 'RATING_AVERAGE',
//   limit: 50,
//   offset: 0,
//   search_query: ''
// }
const search = queryObj => {
  const VALID_SORT_FIELDS = {
    CREATED_AT: 'p."createdAt"',
    RATING_AVERAGE: "TRUNC(AVG(v.rating), 2)",
    RATING_COUNT: "COUNT(v.*)"
  };
  const VALID_SORT_DIRECTIONS = {
    desc: "desc",
    asc: "asc"
  };
  return new Promise(async (resolve, reject) => {
    const defaults = {
      search_query: undefined,
      filter_userId: undefined,
      filter_mbEventId: undefined,
      filter_ratingCount_min: undefined,
      filter_ratingAverage_min: undefined,
      sort_direction: "desc",
      sort_field: "RATING_AVERAGE",
      limit: 10,
      offset: 0
    };

    // generate defaults
    const bindings = {};
    Object.entries(defaults).forEach(([field, defaultValue]) => {
      const queryValue = queryObj[field];
      bindings[field] = queryValue === undefined ? defaultValue : queryValue;
    });

    // clean search_query to trim && remove empty strings
    bindings.search_query = bindings.search_query
      ? bindings.search_query.trim()
      : undefined;

    // coerce '' and other falseys to undefined
    if (!bindings.search_query) {
      bindings.search_query = undefined;
    } else {
      bindings.search_query = `%${bindings.search_query}%`;
    }
    // set sort field
    bindings.sort_field =
      VALID_SORT_FIELDS[bindings.sort_field || defaults.sort_field];
    bindings.sort_direction =
      VALID_SORT_DIRECTIONS[bindings.sort_direction || defaults.sort_direction];
    try {
      const response = await ProjectDao.search(bindings);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  // QUERY
  search,
  findById,
  // MUTATE
  create,
  addMediaAssetsToProject
};
