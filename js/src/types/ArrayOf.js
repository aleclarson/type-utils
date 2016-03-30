var Validator, errorTypes, isType, throwFailure;

throwFailure = require("failure").throwFailure;

errorTypes = require("../errorTypes");

Validator = require("../types/Validator");

isType = require("../core/isType");

module.exports = Validator.Type("ArrayOf", function(types) {
  return {
    validate: function(array, key) {
      var index, value;
      if (key == null) {
        key = "array";
      }
      if (!Array.isArray(array)) {
        return {
          key: key,
          value: array,
          type: Array
        };
      }
      for (index in array) {
        value = array[index];
        if (isType(value, types)) {
          continue;
        }
        key += "[" + index + "]";
        return {
          key: key,
          value: value,
          type: types
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

//# sourceMappingURL=../../../map/src/types/ArrayOf.map
