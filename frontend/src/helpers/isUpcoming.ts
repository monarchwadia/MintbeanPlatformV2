export default function(datestring: string | Date) {
  const endTimeISO = +new Date(new Date(datestring).toISOString());
  const nowISO = +new Date(new Date().toISOString());
  return endTimeISO - nowISO > 0 ? true : false;
}
