const moment = require("moment-timezone");

const getLocalTimezone = function() {
  // retuns IANA (ex: "America/Toronto")
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// TODO: remove hardcoding of Toronto
const dbDateToTimezone = function(
  dbDatestring,
  dbTimezone = "America/Toronto",
  localTimezone = getLocalTimezone()
) {
  const m = moment.tz(dbDatestring, dbTimezone).tz(localTimezone);
  return m.toDate();
};

const buildUtcTimestampByRegion = function(datestr, region) {
  // convert to region moment
  const m = moment.tz(datestr, getLocalTimezone()).tz(region);
  return Date.UTC(
    m.year(),
    m.month(),
    m.day(),
    m.hour(),
    m.second(),
    m.millisecond()
  );
};

const buildUtcDateByRegion = function(datestr, region) {
  return new Date(this.buildUtcTimestampByRegion(datestr, region));
};

// returns the format required for saving to DB
const convertLocalDatetimeToRegion = function(datestr, region) {
  const convertedDate = this.buildUtcDateByRegion(datestr, region);
  // "yyyy-MM-ddThh:mm"
  return moment(convertedDate).format("yyyy-MM-DDThh:mm");
};

module.exports = {
  getLocalTimezone,
  dbDateToTimezone,
  buildUtcTimestampByRegion,
  buildUtcDateByRegion,
  convertLocalDatetimeToRegion
};
