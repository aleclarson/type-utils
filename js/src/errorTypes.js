var formatType, getTypeName, getTypeNames, inArray, vowels;

inArray = require("in-array");

vowels = ["a", "e", "i", "o", "u"];

module.exports = {
  invalidType: function(type, key) {
    var hasVowel, reason;
    type = formatType(type);
    hasVowel = inArray(vowels, type[0].toLowerCase());
    reason = key ? "'" + key + "' must be " : "Expected ";
    reason += hasVowel ? "an " : "a ";
    reason += type + "!";
    return TypeError(reason);
  }
};

formatType = function(types) {
  if (Array.isArray(types)) {
    return getTypeNames(types);
  }
  return getTypeName(types);
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

//# sourceMappingURL=../../map/src/errorTypes.map
