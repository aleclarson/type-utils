var getKind;

getKind = require("./getKind");

module.exports = function(type) {
  var types;
  types = [];
  while (true) {
    types.push(type);
    type = getKind(type);
    if (type == null) {
      break;
    }
  }
  return types;
};

//# sourceMappingURL=../../../map/src/core/getKinds.map
