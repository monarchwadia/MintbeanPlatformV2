const prettyESTDate = function(datestring, options = {}) {
  // hard-coded for EST time, but dynamic locale
  let locale;
  if (navigator) {
    locale = navigator.language ? navigator.language : "en-CA";
  }
  const localizedDate = new Date(datestring).toLocaleString(locale, {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: "America/Detroit", // EST,
    ...options
  });
  return localizedDate + " EST";
};

export default prettyESTDate;
