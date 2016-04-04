var Validator, assertType, inArray, throwFailure;

throwFailure = require("failure").throwFailure;

inArray = require("in-array");

assertType = require("../core/assertType");

Validator = require("./Validator");

module.exports = Validator.Type("OneOf", function(name, expectedValues) {
  assertType(name, String);
  assertType(expectedValues, Array);
  return {
    expectedValues: expectedValues,
    getName: function() {
      return name;
    },
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
      var error, reason;
      if (!values.key) {
        reason = "Unexpected value!";
      } else {
        reason = "'" + values.key + "' has an unexpected value!";
      }
      error = TypeError(reason);
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/OneOf.map
