var assertType, isValidator;

isValidator = require("./isValidator");

assertType = require("./assertType");

module.exports = function(obj, types) {
  var key, type;
  if (isValidator(types)) {
    throw Error("'You must use 'assertType()' if you want to use a Validator!");
  }
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
