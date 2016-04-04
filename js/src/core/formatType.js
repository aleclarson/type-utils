var getTypeName, getTypeNames;

module.exports = function(type) {
  if (Array.isArray(type)) {
    return getTypeNames(type);
  }
  return getTypeName(type);
};

getTypeNames = function(types) {
  var lastType, typeCount, typeNames;
  typeNames = [];
  types.forEach(function(type) {
    return typeNames.push(getTypeName(type));
  });
  typeCount = typeNames.length;
  if (typeCount === 1) {
    return typeNames[0];
  } else if (typeCount === 2) {
    return typeNames[0] + " or " + typeNames[1];
  }
  lastType = typeNames.pop();
  return typeNames.join(", ") + ", or " + lastType;
};

getTypeName = function(type) {
  if (type === null) {
    return "null object";
  }
  if (type && type.name) {
    return type.name;
  }
  return "[unknown type]";
};

//# sourceMappingURL=../../../map/src/core/formatType.map
