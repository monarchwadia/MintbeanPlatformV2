// ensure leading 0 where necessary
const prepend = unit => {
  return ("0" + unit).slice(-2);
};

const parseDatetimeStr = datetimeStr => {
  // sample datetime string: "2020-08-06T12:00"
  const parts = datetimeStr.split(/[-T:]/);
  return {
    year: +parts[0] || 0,
    month: +parts[1] - 1 || 0, // month must be zero indexed [0-11]
    date: +parts[2] || 0,
    hours: +parts[3] || 0,
    mins: +parts[4] || 0
  };
};

const toWallclockTime = datetimeStr => {
  if (!datetimeStr) return datetimeStr;
  const timeObj = parseDatetimeStr(datetimeStr);
  const { year, month, date, hours, mins } = timeObj;
  return Date.UTC(year, month, date, hours, mins);
};

const toDatetimeStr = wallclockTime => {
  if (!wallclockTime) return wallclockTime;

  const year = wallclockTime.getFullYear();
  const month = prepend(wallclockTime.getMonth() + 1);
  const date = prepend(wallclockTime.getDate());
  const hour = prepend(wallclockTime.getHours());
  const mins = prepend(wallclockTime.getMinutes());

  return `${year}-${month}-${date}T${hour}:${mins}`;
};

module.exports = {
  toWallclockTime,
  toDatetimeStr
};
