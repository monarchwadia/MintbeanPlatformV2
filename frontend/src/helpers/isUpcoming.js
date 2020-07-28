// returns true if Date is in the future relative to now

const isUpcoming = function(datestring) {
  const endTimeISO = new Date(new Date(datestring).toISOString());
  const nowISO = new Date(new Date().toISOString());
  return endTimeISO - nowISO > 0 ? true : false;
};

export default isUpcoming;
