var assert, getConstructor, getProto;

getProto = require("getProto");

getConstructor = require("./getConstructor");

assert = require("./assert");

module.exports = function(type) {
  var __proto__, prototype;
  prototype = type && type.prototype;
  assert(prototype, "Expected a constructor type!");
  __proto__ = getProto(prototype);
  if (!__proto__) {
    return null;
  }
  return getConstructor(__proto__);
};

//# sourceMappingURL=../../../map/src/core/getKind.map
