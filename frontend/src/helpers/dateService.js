const moment = require("moment-timezone");

const getLocalTimezone = function() {
  // retuns IANA (ex: "America/Toronto")
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// TODO: remove hardcoding of Toronto
// const dbDateToTimezone = function(
//   dbDatestring,
//   dbTimezone = "America/Toronto",
//   localTimezone = getLocalTimezone()
// ) {
//   const m = moment.tz(dbDatestring, dbTimezone).tz(localTimezone);
//   return m.toDate();
// };

// const buildUtcTimestampByRegion = function(datestr, region) {
//   // convert to region moment
//   const m = moment.tz(datestr, getLocalTimezone()).tz(region);
//   return Date.UTC(
//     m.year(),
//     m.month(),
//     m.day(),
//     m.hour(),
//     m.second(),
//     m.millisecond()
//   );
// };

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

const buildUTCTimestampStrFromDate = date => {
  if (!date) throw "must pass a date";
  return buildTimestampStr({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    date: date.getUTCDate(),
    hour: date.getUTCHours(),
    min: date.getUTCMinutes()
  });
};
//
// const buildUtcDateByRegion = function(datestr, region) {
//   return new Date(buildUtcTimestampByRegion(datestr, region));
// };

// returns the format required for saving to DB
// const convertLocalDatetimeToRegion = function(datestr, region) {
//   const convertedDate = buildUtcDateByRegion(datestr, region);
//   // "yyyy-MM-ddThh:mm"
//   return moment(convertedDate).format("yyyy-MM-DDThh:mm");
// };

const prettyLocalDate = function(
  masterDate,
  masterRegion,
  userRegion = "America/Toronto" // TODO : dynamic timezone retreival. JS's Intl returns some IANA not covered by moment
) {
  if (!masterDate || !masterRegion) throw "Must pass valid utc date and region";
  const m = moment.tz(masterDate, masterRegion).tz(userRegion)
  return m.format("dddd, MMM Do YYYY, h:mm z");
};

const convertDateToTimezone = function(date, ianaTimezone) {
  if (!date) throw "Must pass date"
  return moment(date).tz(ianaTimezone)
}

module.exports = {
  buildTimestampStr,
  buildUTCTimestampStrFromDate,
  prettyLocalDate,
  getLocalTimezone,
  convertDateToTimezone,
  // dbDateToTimezone,
  // buildUtcDateByRegion,
  // convertLocalDatetimeToRegion
};
