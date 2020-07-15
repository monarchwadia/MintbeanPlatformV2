export default function(date) {
  let locale;
  if (navigator) {
    locale = navigator.language ? navigator.language : 'en-CA';
  }
  const localizedDate = new Date(date).toLocaleString(locale, {hour: 'numeric', minute: '2-digit', month: 'short', year: 'numeric', day: 'numeric'});
  return localizedDate;
}
