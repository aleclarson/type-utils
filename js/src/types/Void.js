var Validator, Void;

Validator = require("./Validator");

module.exports = Void = Validator("Void", {
  getName: function() {
    return "undefined";
  },
  validate: function(value, key) {
    if (value === void 0) {
      return true;
    }
    return {
      key: key,
      value: value,
      type: Void
    };
  },
  fail: function(values) {
    var error;
    error = TypeError("Expected an undefined value!");
    return throwFailure(error, values);
  }
});

//# sourceMappingURL=../../../map/src/types/Void.map
