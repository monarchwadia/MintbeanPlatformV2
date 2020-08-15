import models from "../db/models";
import { Project } from "../types/Project";
const { MbConfig, Project, User, MbEvent, MediaAsset } = models;

("use strict");

// THE WAY OF DAO
// - first/last point of contact with 'the external' (db, apis, etc)
// - return promises
// - return standardized objects (not raw ORM models)
// - only send bare minimum

// INTERFACES
interface MbConfigObjRaw {
  id: string;
  configKey: string;
  configValue: string;
  updatedAt: string;
  createdAt: string;
}

interface MbConfigObjParsed {
  id: string;
  configKey: string;
  configValue: string | object | Array<any> | number | boolean;
  updatedAt: string;
  createdAt: string;
}

interface FeaturedProjectSectionRaw {
  title: string;
  projectIds: Array<string>;
}

interface FeaturedProjectSectionParsed {
  title: string;
  projects: Array<Project>;
}

// UTILITIES ******************************************
function hasJsonStructure(str: string) {
  try {
    const result: object = JSON.parse(str);
    const type: string = Object.prototype.toString.call(result);
    return type === "[object Object]" || type === "[object Array]";
  } catch (err) {
    return false;
  }
}

const objWithParsedConfigValue = (obj: MbConfigObjRaw): MbConfigObjParsed => {
  return {
    ...obj,
    configValue: hasJsonStructure(obj.configValue)
      ? JSON.parse(obj.configValue)
      : obj.configValue
  };
};

// QUERYING DAOS *************************************
const findOneWhere = (where: object = {}) => {
  return MbConfig.findOne({
    where,
    raw: true,
    nest: true
  }).then((obj: any) => {
    if (!!obj) {
      return objWithParsedConfigValue(obj);
    }
    return obj;
  });
};

const findByKey = (key: string) => findOneWhere({ configKey: key });

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
      const response: any = await MbConfig.findOne({
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

    let pids: any = new Set<string>();
    val.sections.forEach((s: FeaturedProjectSectionRaw): void => {
      s.projectIds.forEach((pid: string) => pids.add(pid));
    });

    const pidsArray: string[] = Array.from(pids);
    let projects: Array<Project> = [];
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

    const responseObj: FeaturedProjectSectionParsed = val.sections.map(
      (section: FeaturedProjectSectionRaw) => {
        const projs = section.projectIds.map((pid: string) =>
          projects.find((p: Project) => p.id === pid)
        );
        return {
          title: section.title,
          projects: projs
        };
      }
    );
    resolve(responseObj);
  });
};

// MUTATING DAOS *************************************
const updateWhere = (where: object = {}, val: object | string) => {
  // store objects as strings
  const strParsedVal = typeof val === "object" ? JSON.stringify(val) : val;
  return MbConfig.update(
    { configValue: strParsedVal },
    { returning: true, where }
  )
    .then((arr: any) => {
      return arr[1][0];
    })
    .then((obj: any) => {
      return objWithParsedConfigValue(obj.get({ raw: true }));
    });
};

const updateByKey = (key: string, val: string | object) => {
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
