function fill (props, obj={}) {
  Object.entries(props).forEach(([key, definition]) => {
    // since typeof null === 'object', it can't be handled by "case 'object'" below.
    // handling it as a special case here.
    if (definition === null) {
      obj[key] = definition;
      return;
    }

    switch (typeof definition) {
      case 'function':
        obj[key] = definition(obj);
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
  const one = (overrides = {}) => fill(Object.assign({}, defaults, overrides));

  const bulk = (count=10, overrides = {}) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(one(overrides));
    }
    return arr;
  }

  return {
    one,
    bulk
  }
}

