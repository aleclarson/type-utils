var Validator, Void, errorTypes, formatType, isType, throwFailure;

throwFailure = require("failure").throwFailure;

formatType = require("../core/formatType");

errorTypes = require("../errorTypes");

Validator = require("./Validator");

isType = require("../core/isType");

Void = require("../types/Void");

module.exports = Validator.Type("Maybe", function(type) {
  return {
    getName: function() {
      return formatType(type) + "?";
    },
    validate: function(value, key) {
      if (value === void 0) {
        return true;
      }
      if (isType(value, type)) {
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
      error = errorTypes.invalidType([type, Void], values.key);
      return throwFailure(error, values);
    }
  };
});

//# sourceMappingURL=../../../map/src/types/Maybe.map
