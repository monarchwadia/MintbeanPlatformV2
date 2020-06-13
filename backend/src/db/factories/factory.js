function fill (props, obj={}, index=0) {
  Object.entries(props).forEach(([key, definition]) => {
    // since typeof null === 'object', it can't be handled by "case 'object'" below.
    // handling it as a special case here.
    if (definition === null) {
      obj[key] = definition;
      return;
    }

    switch (typeof definition) {
      case 'function':
        obj[key] = definition(obj, index);
        break;
      case 'object':
        obj[key] = fill(definition, obj);
        break;
      default:
        obj[key] = definition;
        break;
    }
  });

  return obj;
}

module.exports = (defaults={}) => {
  const one = (overrides = {}, index) => fill(Object.assign({}, defaults, overrides), {}, index);

  const bulk = (count=10, overrides = {}) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(one(overrides, i));
    }
    return arr;
  }

  return {
    one,
    bulk
  }
}

