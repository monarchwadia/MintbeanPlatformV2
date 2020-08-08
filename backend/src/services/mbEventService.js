const MbEventDao = require("../daos/MbEventDao");
const dates = require("../utils/dates");

("use strict");
// HOW TO SERVICE
// - return promises
// - return standardized objects (not raw models)

// MbEvent object interface:
// {
//   title: STRING,
//   description: STRING,
//   cover_image_url: STRING,
//   instructions: STRING,
//   start_time: STRING        //  * wall clock 'YYYY-MM-DDTHH-MM'
//   end_time: STRING          //  * wall clock 'YYYY-MM-DDTHH-MM'
//   register_link: STRING,
//   region: STRING,
//   Projects: Project[],
// }

// UTILITIES ******************************************
const eventWalltimeAdjusted = event => {
  return {
    ...event,
    start_time: dates.toDatetimeStr(event.start_time), // to walltime
    end_time: dates.toDatetimeStr(event.end_time) // to walltime
  };
};

// QUERYING SERVICES **********************************

const findById = id => {
  return MbEventDao.findById(id).then(event => {
    return eventWalltimeAdjusted(event);
  });
};

const listAll = () => {
  return MbEventDao.findAllWhere().then(events => {
    return events.map(event => eventWalltimeAdjusted(event));
  });
};

// MUTATING SERVICES **********************************

module.exports = {
  findById,
  listAll
};
