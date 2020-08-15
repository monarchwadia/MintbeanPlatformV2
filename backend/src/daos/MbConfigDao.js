import { MbConfig, Project, User, MbEvent, MediaAsset } from "../db/models";
("use strict");

// THE WAY OF DAO
// - first/last point of contact with 'the external' (db, apis, etc)
// - return promises
// - return standardized objects (not raw ORM models)
// - only send bare minimum

// MbConfig object interface (in lieu of typescript for now)
// {
//   id: STRING
//   configKey: STRING,
//   configValue: STRING
//   updatedAt: STRING
//   createdAt: STRING
// }

// UTILITIES ******************************************
function hasJsonStructure(str) {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === "[object Object]" || type === "[object Array]";
  } catch (err) {
    return false;
  }
}

const objWithParsedConfigValue = obj => {
  const isJ = hasJsonStructure(obj.configValue);
  return {
    ...obj,
    configValue: hasJsonStructure(obj.configValue)
      ? JSON.parse(obj.configValue)
      : obj.configValue
  };
};

// QUERYING DAOS *************************************
const findOneWhere = (where = {}) => {
  return MbConfig.findOne({
    where,
    raw: true,
    nest: true
  }).then(obj => {
    if (!!obj) {
      return objWithParsedConfigValue(obj);
    }
    return obj;
  });
};

const findByKey = key => findOneWhere({ configKey: key });

const getAscFeaturedSectionsArr = () => {
  // returns shape:
  // [
  //   {
  //     title: section.title,
  //     projects: projs
  //   }
  // ]
  return new Promise(async (resolve, reject) => {
    let val;
    try {
      const response = await MbConfig.findOne({
        where: { configKey: "featuredSections" }
      });
      if (response) {
        val = JSON.parse(response.configValue);
      } else {
        reject('error fetching MbConfig with configKey: "featedSections" ');
      }
    } catch (e) {
      reject(e);
    }

    let pids = new Set();
    val.sections.forEach(s => {
      s.projectIds.forEach(pid => pids.add(pid));
    });

    const pidsArray = Array.from(pids);
    let projects = [];
    try {
      projects = await Project.findAll({
        where: { id: pidsArray },
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "password_hash",
                "reset_token",
                "reset_token_created_at"
              ]
            }
          },
          { model: MbEvent },
          { model: MediaAsset }
        ]
      });
    } catch (e) {
      reject(e);
    }

    const responseObj = val.sections.map(section => {
      const projs = section.projectIds.map(pid =>
        projects.find(p => p.id === pid)
      );
      return {
        title: section.title,
        projects: projs
      };
    });
    resolve(responseObj);
  });
};

// MUTATING DAOS *************************************
const updateWhere = (where = {}, val) => {
  // store objects as strings
  const strVal = typeof val === "object" ? JSON.stringify(val) : val;
  return MbConfig.update({ configValue: strVal }, { returning: true, where })
    .then(arr => {
      return arr[1][0];
    })
    .then(obj => {
      return objWithParsedConfigValue(obj.get({ raw: true }));
    });
};

const updateByKey = (key, val) => {
  return updateWhere({ configKey: key }, val);
};

module.exports = {
  // QUERY
  findOneWhere,
  getAscFeaturedSectionsArr,
  findByKey,
  // MUTATE
  updateWhere,
  updateByKey
};
