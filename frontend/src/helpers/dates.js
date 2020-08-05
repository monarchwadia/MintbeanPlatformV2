const moment = require("moment-timezone");

const getLocalTimezone = function() {
  // retuns IANA (ex: "America/Toronto")
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// IMPORTANT: month is zero index (0-11)
const buildTimestampStr = function({ year, month, date, hour, min, sec }) {
  if (!year || !month || !date) throw "Must supply year month and date";
  if (year.length < 4 || year.length > 4) throw "Invalid year";
  if (month > 12) throw "Invalid month";

  if (min > 59) min = 0;
  if (hour > 24) hour = 0;

  const prepend = unit => {
    return ("0" + unit).slice(-2);
  };

  hour = hour ? prepend(hour) : "00";
  min = min ? prepend(min) : "00";
  sec = sec ? prepend(sec) : "00";
  month = prepend(month + 1); // .getMonth is [0-11]
  date = prepend(date);
  return `${year}-${month}-${date}T${hour}:${min}:${sec}`;
};

const prettyLocalDate = function(
  masterDate,
  masterRegion,
  userRegion = getLocalTimezone() // TODO : dynamic timezone retreival. JS's Intl returns some IANA not covered by moment
) {
  if (!masterDate || !masterRegion) throw "Must pass valid utc date and region";
  const m = moment.tz(masterDate, masterRegion).tz(userRegion);
  return m.format("dddd, MMM Do YYYY, h:mm z");
};

const convertDateToTimezone = function(date, ianaTimezone) {
  if (!date) throw "Must pass date";
  return moment(date).tz(ianaTimezone);
};

module.exports = {
  buildTimestampStr,
  prettyLocalDate,
  getLocalTimezone,
  convertDateToTimezone
};
