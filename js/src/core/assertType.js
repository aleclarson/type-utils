var Accumulator, errorTypes, isConstructor, isType, isValidator, throwFailedValidator, throwFailure, throwInvalidType;

throwFailure = require("failure").throwFailure;

Accumulator = require("accumulator");

isConstructor = require("./isConstructor");

isValidator = require("./isValidator");

errorTypes = require("../errorTypes");

isType = require("./isType");

module.exports = function(value, type, key) {
  var relevantData, result;
  if (isConstructor(key, Object)) {
    relevantData = key;
    key = relevantData.key;
  } else {
    relevantData = {
      key: key
    };
  }
  if (!type) {
    throwFailure(Error("Must provide a 'type'!"), {
      value: value,
      type: type,
      key: key,
      relevantData: relevantData
    });
  }
  if (isValidator(type)) {
    result = type.validate(value, key);
    if (result !== true) {
      throwFailedValidator(type, result, relevantData);
    }
  } else if (!isType(value, type)) {
    throwInvalidType(type, value, relevantData);
  }
};

throwFailedValidator = function(type, result, relevantData) {
  var accumulated;
  accumulated = Accumulator();
  accumulated.push(result);
  if (relevantData) {
    accumulated.push(relevantData);
  }
  return type.fail(accumulated.flatten());
};

throwInvalidType = function(type, value, relevantData) {
  var accumulated, error;
  accumulated = Accumulator();
  accumulated.push({
    type: type,
    value: value
  });
  if (relevantData) {
    accumulated.push(relevantData);
  }
  error = errorTypes.invalidType(type, relevantData.key);
  return throwFailure(error, accumulated.flatten());
};

//# sourceMappingURL=../../../map/src/core/assertType.map
