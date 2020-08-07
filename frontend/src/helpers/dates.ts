/* eslint-disable @typescript-eslint/no-explicit-any */
const moment = require("moment-timezone");

const getLocalTimezone = function() {
  // retuns IANA (ex: "America/Toronto")
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

interface TimeNumObj {
  year: number;
  month: number;
  date: number;
  hour: number;
  min: number;
  sec?: number;
}

// IMPORTANT: month is zero index (0-11)
const buildTimestampStr = function({
  year,
  month,
  date,
  hour,
  min,
  sec
}: TimeNumObj): string {
  if (!year || !month || !date) throw "Must supply year month and date";
  if (year.toString().length < 4 || year.toString().length > 4)
    throw "Invalid year";
  if (month > 12) throw "Invalid month";

  if (min > 59) min = 0;
  if (hour > 24) hour = 0;

  const prepend = (unit: number): string => {
    return ("0" + unit).slice(-2);
  };

  const hourS = hour ? prepend(hour) : "00";
  const minS = min ? prepend(min) : "00";
  const secS = sec ? prepend(sec) : "00";
  const monthS = prepend(month + 1); // .getMonth is [0-11]
  const dateS = prepend(date);
  return `${year}-${monthS}-${dateS}T${hourS}:${minS}:${secS}`;
};

const prettyLocalDate = function(
  masterDate: string,
  masterRegion: string,
  userRegion = getLocalTimezone() // TODO : dynamic timezone retreival. JS's Intl returns some IANA not covered by moment
): string {
  if (!masterDate || !masterRegion) throw "Must pass valid utc date and region";
  const m = moment.tz(masterDate, masterRegion).tz(userRegion);
  return m.format("dddd, MMM Do YYYY, h:mm z");
};

const convertDateToTimezone = function(
  date: string,
  ianaTimezone: string
): any {
  if (!date) throw "Must pass date";
  return moment(date).tz(ianaTimezone);
};
const convertMomentToNewTimezone = function(
  originDate: string,
  originRegion: string,
  targetRegion: string
): any {
  if (!originDate || !originRegion || !targetRegion) throw "Invalid arguments";
  return moment(originDate, originRegion).tz(targetRegion);
};

module.exports = {
  buildTimestampStr,
  prettyLocalDate,
  getLocalTimezone,
  convertDateToTimezone,
  convertMomentToNewTimezone
};

/* eslint-enable @typescript-eslint/no-explicit-any */
