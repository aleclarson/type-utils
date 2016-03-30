var assertType;

assertType = require("./assertType");

module.exports = function(obj, types) {
  var key, type;
  assertType(obj, Object);
  assertType(types, Object);
  for (key in types) {
    type = types[key];
    assertType(obj[key], type, {
      key: key,
      obj: obj,
      types: types
    });
  }
};

//# sourceMappingURL=../../../map/src/core/validateTypes.map
