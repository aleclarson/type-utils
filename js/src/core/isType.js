var getConstructor, isType, isValidator;

getConstructor = require("./getConstructor");

isValidator = require("./isValidator");

module.exports = isType = function(value, type) {
  var i, len, types;
  if (Array.isArray(type)) {
    types = type;
    for (i = 0, len = types.length; i < len; i++) {
      type = types[i];
      if (isType(value, type)) {
        return true;
      }
    }
    return false;
  }
  if (isValidator(type)) {
    return type.validate(value) === true;
  }
  if (value == null) {
    return false;
  }
  return type === getConstructor(value);
};

//# sourceMappingURL=../../../map/src/core/isType.map
