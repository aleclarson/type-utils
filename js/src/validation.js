var getTypeNames, reportFailure;

reportFailure = require("report-failure");

getTypeNames = require("./helpers").getTypeNames;

module.exports = function(TU) {
  var addValidatorType, validateType, validateTypes, validateWithArray, validateWithFunction, validatorTypeCache;
  validatorTypeCache = [];
  validateType = function(value, validator, keyPath) {
    var config, error, i, len;
    for (i = 0, len = configs.length; i < len; i++) {
      config = configs[i];
      if (config.isType(validator)) {
        return config.validate(value, validator, keyPath);
      }
    }
    error = TypeError("'validator' has an unexpected type.");
    return reportFailure(error, {
      key: keyPath,
      value: value,
      validator: validator
    });
  };
  validateTypes = function(obj, validators, keyPath) {
    var key, validator, value;
    if (validators == null) {
      return;
    }
    TU.assertType(validators, Object, keyPath);
    for (key in validators) {
      validator = validators[key];
      value = obj[key];
      if (keyPath != null) {
        key = keyPath + "." + key;
      }
      if (TU.isType(validator, Object)) {
        if (value == null) {
          continue;
        }
        TU.assertKind(value, Object, key);
        validateTypes(value, validator, key);
      } else {
        validateType(value, validator, key);
      }
    }
  };
  addValidatorType = function(type, validate) {
    return validatorTypeCache.push({
      type: type,
      validate: validate
    });
  };
  validateWithFunction = function(value, validator, keyPath) {
    return validator(value, keyPath);
  };
  validateWithArray = function(value, types, keyPath) {
    var error, typeNames;
    if (types.length === 0) {
      return;
    }
    if (types.length === 1) {
      return TU.assertType(value, types[0], keyPath);
    }
    if (TU.isType(value, types)) {
      return;
    }
    keyPath = keyPath != null ? "'" + keyPath + "'" : "This property";
    typeNames = getTypeNames(types);
    error = TypeError(keyPath + " must be a " + typeNames);
    return reportFailure(error, {
      key: keyPath,
      value: value,
      types: types
    });
  };
  addValidatorType(Function, validateWithFunction);
  addValidatorType(Array, validateWithArray);
  return {
    validateTypes: validateTypes,
    addValidatorType: addValidatorType
  };
};

//# sourceMappingURL=../../map/src/validation.map
