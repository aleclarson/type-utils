var Accumulator, errorTypes, invalidType, isConstructor, isType, isValidator, throwFailure, validatorFailed;

throwFailure = require("failure").throwFailure;

Accumulator = require("accumulator");

isConstructor = require("./isConstructor");

isValidator = require("./isValidator");

errorTypes = require("../errorTypes");

isType = require("./isType");

module.exports = function(value, type, key) {
  var result;
  if (isValidator(type)) {
    result = type.validate(value, key);
    if (result !== true) {
      validatorFailed(type, result, key);
    }
  } else if (!isType(value, type)) {
    invalidType(type, value, key);
  }
};

validatorFailed = function(type, result, key) {
  var accumulated;
  accumulated = Accumulator();
  accumulated.push(result);
  if (isConstructor(key, Object)) {
    accumulated.push(key);
    key = key.key;
  }
  return type.fail(accumulated.flatten());
};

invalidType = function(type, value, key) {
  var accumulated, error;
  accumulated = Accumulator();
  accumulated.push({
    type: type,
    value: value
  });
  if (isConstructor(key, Object)) {
    accumulated.push(key);
    key = key.key;
  }
  error = errorTypes.invalidType(type, key);
  return throwFailure(error, accumulated.flatten());
};

//# sourceMappingURL=../../../map/src/core/assertType.map
