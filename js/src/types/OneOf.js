var Validator, assertType, inArray, throwFailure;

throwFailure = require("failure").throwFailure;

inArray = require("in-array");

assertType = require("../core/assertType");

Validator = require("./Validator");

module.exports = Validator.Type("OneOf", function(name, values) {
  assertType(name, String);
  assertType(values, Array);
  return {
    values: values,
    getName: function() {
      return name;
    },
    validate: function(value, key) {
      if (inArray(values, value)) {
        return true;
      }
      return {
        key: key,
        value: value,
        expected: values
      };
    },
    fail: function(values) {
      var error, reason;
      if (values.key) {
        reason = "'" + values.key + "' must be a " + name + "!";
      } else {
        reason = "Expected a " + name + "!";
      }
      error = TypeError(reason);
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/OneOf.map
