var Validator, throwFailure;

throwFailure = require("failure").throwFailure;

Validator = require("../types/Validator");

module.exports = Validator.Type("Kind", function(type) {
  return {
    validate: function(value, key) {
      if (value instanceof type) {
        return true;
      }
      return {
        key: key,
        value: value,
        type: type
      };
    },
    fail: function(values) {
      var error;
      if (values.key) {
        error = TypeError("'" + values.key + "' must inherit from " + type.name + "!");
      } else {
        error = TypeError("Expected a kind of " + type.name + "!");
      }
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/Kind.map
