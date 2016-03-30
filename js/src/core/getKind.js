var assert, getConstructor;

getConstructor = require("./getConstructor");

assert = require("./assert");

module.exports = function(type) {
  var prototype;
  prototype = type && type.prototype;
  assert(prototype, "Expected a constructor type!");
  if (type === Object) {
    return null;
  }
  return getConstructor(prototype.__proto__);
};

//# sourceMappingURL=../../../map/src/core/getKind.map
