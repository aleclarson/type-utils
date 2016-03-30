var Validator, inArray, throwFailure;

throwFailure = require("failure").throwFailure;

inArray = require("in-array");

Validator = require("../types/Validator");

module.exports = Validator.Type("OneOf", function(expectedValues) {
  return {
    validate: function(value, key) {
      if (inArray(expectedValues, value)) {
        return true;
      }
      return {
        key: key,
        value: value,
        expectedValues: expectedValues
      };
    },
    fail: function(values) {
      var error;
      if (values.key) {
        error = TypeError("Unexpected value!");
      } else {
        error = TypeError("'" + key + "' has an unexpected value!");
      }
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/OneOf.map
