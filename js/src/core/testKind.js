var getKind, inArray, valueTypes;

inArray = require("in-array");

valueTypes = [Number, String, Boolean];

getKind = require("./getKind");

module.exports = function(type, kind) {
  while (true) {
    if (type === kind) {
      return true;
    }
    if (type === Object) {
      break;
    }
    if (inArray(valueTypes, type)) {
      return false;
    }
    type = getKind(type);
    if (type === null) {
      break;
    }
  }
  return false;
};

//# sourceMappingURL=../../../map/src/core/testKind.map
