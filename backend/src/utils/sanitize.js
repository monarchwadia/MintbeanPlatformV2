// return obj with deleted attributes (ex: hide password_hash )
// only works at shallow level
const sanitize = (obj, attrArr) => {
  const sanitizedObj = Object.assign({}, obj);
  attrArr.forEach(attribute => {
    delete sanitizedObj[attribute];
  });
  return sanitizedObj;
};

module.exports = { sanitize };
