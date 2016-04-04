var Null, Validator;

Validator = require("./Validator");

module.exports = Null = Validator("Null", {
  getName: function() {
    return "null";
  },
  validate: function(value, key) {
    if (value === null) {
      return true;
    }
    return {
      key: key,
      value: value,
      type: Null
    };
  },
  fail: function(values) {
    var error;
    error = TypeError("Expected a null value!");
    return throwFailure(error, values);
  }
});

//# sourceMappingURL=../../../map/src/types/Null.map
