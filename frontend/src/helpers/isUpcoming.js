export default function(datestring) {
  const endTimeISO = new Date(new Date(datestring).toISOString());
  const nowISO = new Date((new Date).toISOString());
  return (endTimeISO - nowISO > 0) ? true : false;
}
