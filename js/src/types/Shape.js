var Validator, assertType, errorTypes, isConstructor, isType, throwFailure;

throwFailure = require("failure").throwFailure;

isConstructor = require("../core/isConstructor");

assertType = require("../core/assertType");

errorTypes = require("../errorTypes");

Validator = require("../types/Validator");

isType = require("../core/isType");

module.exports = Validator.Type("Shape", function(types) {
  assertType(types, Object);
  return {
    validate: function(obj, key) {
      var type, value;
      if (!isConstructor(obj, Object)) {
        return {
          key: key,
          value: obj,
          type: Object
        };
      }
      for (key in types) {
        type = types[key];
        value = obj[key];
        if (isType(value, type)) {
          continue;
        }
        return {
          key: key,
          value: value,
          type: type,
          obj: obj,
          types: types
        };
      }
      return true;
    },
    fail: function(values) {
      var error;
      error = errorTypes.invalidType(values.type, values.key);
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/Shape.map
