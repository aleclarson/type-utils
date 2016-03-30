var setType;

setType = require("./setType");

module.exports = function(type, kind) {
  var prototype;
  prototype = type && type.prototype;
  setType(prototype, kind);
  return type;
};

//# sourceMappingURL=../../../map/src/core/setKind.map
