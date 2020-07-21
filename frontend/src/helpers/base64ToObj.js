const base64ToObj = function(base64) {
  let obj;
  try {
    obj = JSON.parse(Buffer.from(base64, "base64").toString());
  } catch {
    return null;
  }
  return obj;
};

export default base64ToObj;
