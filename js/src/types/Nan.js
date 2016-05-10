var Nan, Validator, isNan;

Validator = require("./Validator");

isNan = require("../core/isNan");

module.exports = Nan = Validator("Nan", {
  getName: function() {
    return "NaN";
  },
  validate: function(value, key) {
    if (isNan(value)) {
      return true;
    }
    return {
      key: key,
      value: value,
      type: Nan
    };
  },
  fail: function(values) {
    var error;
    error = TypeError("Expected a number error!");
    return throwFailure(error, values);
  }
});

//# sourceMappingURL=../../../map/src/types/Nan.map
