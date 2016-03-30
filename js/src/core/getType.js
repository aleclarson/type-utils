var Null, Void, getConstructor;

getConstructor = require("./getConstructor");

Void = require("../types/Void");

Null = require("../types/Null");

module.exports = function(value) {
  if (value === void 0) {
    return Void;
  }
  if (value === null) {
    return Null;
  }
  return getConstructor(value);
};

//# sourceMappingURL=../../../map/src/core/getType.map
