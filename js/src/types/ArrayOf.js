var Validator, errorTypes, formatType, isType, throwFailure;

throwFailure = require("failure").throwFailure;

formatType = require("../core/formatType");

errorTypes = require("../errorTypes");

Validator = require("./Validator");

isType = require("../core/isType");

module.exports = Validator.Type("ArrayOf", function(type) {
  return {
    getName: function() {
      return "an array of " + formatType(type);
    },
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
        if (isType(value, type)) {
          continue;
        }
        key += "[" + index + "]";
        return {
          key: key,
          value: value,
          type: type
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
