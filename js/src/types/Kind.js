var Validator, throwFailure;

throwFailure = require("failure").throwFailure;

Validator = require("./Validator");

module.exports = Validator.Type("Kind", function(type) {
  return {
    getName: function() {
      return "a kind of " + type.name;
    },
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
      var error, reason;
      if (!values.key) {
        reason = "Expected " + this.name + "!";
      } else {
        reason = "'" + values.key + "' must be " + this.name + "!";
      }
      error = TypeError(reason);
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/Kind.map
