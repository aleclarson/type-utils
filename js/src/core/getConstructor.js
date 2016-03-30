var Nan, isNan;

isNan = require("./isNan");

Nan = require("../types/Nan");

module.exports = function(value) {
  var ctr;
  ctr = value.constructor;
  if (!ctr) {
    return null;
  }
  if (isNan(value, ctr)) {
    return Nan;
  }
  return ctr;
};

//# sourceMappingURL=../../../map/src/core/getConstructor.map
