const MbEventDao = require("../daos/MbEventDao");
const dates = require("../utils/dates");

("use strict");
// HOW TO SERVICE
// - transform and make decisions
// - return promises
// - return standardized objects (not raw models)

// MbEvent object interface (in lieu of typescript for now)
// {
//   title: STRING,
//   description: STRING,
//   cover_image_url: STRING,
//   instructions: STRING,
//   start_time: STRING        //  * wall clock 'YYYY-MM-DDTHH-MM'
//   end_time: STRING          //  * wall clock 'YYYY-MM-DDTHH-MM'
//   register_link: STRING,
//   region: STRING,
//   (for single Event:)
//   Projects: Project[],
// }

// UTILITIES ******************************************
const transformEventTime = (event, callback) => {
  return {
    ...event,
    start_time: callback(event.start_time),
    end_time: callback(event.end_time)
  };
};

const adjustWalltimeOut = event => {
  return transformEventTime(event, dates.toDatetimeStr);
};
const adjustWalltimeIn = event => {
  return transformEventTime(event, dates.toWallclockTime);
};

// QUERYING SERVICES **********************************

const findById = id => {
  return MbEventDao.findById(id).then(event => {
    return adjustWalltimeOut(event);
  });
};

const listAll = () => {
  return MbEventDao.findAllWhere().then(events => {
    return events.map(event => adjustWalltimeOut(event));
  });
};

// MUTATING SERVICES **********************************

const create = rawEvent => {
  return MbEventDao.create(adjustWalltimeIn(rawEvent)).then(event =>
    adjustWalltimeOut(event)
  );
};

module.exports = {
  findById,
  listAll,
  create
};
