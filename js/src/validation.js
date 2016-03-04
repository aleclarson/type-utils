var getTypeNames, throwFailure;

throwFailure = require("failure").throwFailure;

getTypeNames = require("./helpers").getTypeNames;

module.exports = function(TU) {
  var addValidatorType, validateType, validateTypes, validateWithArray, validateWithFunction, validatorTypes;
  validatorTypes = [];
  addValidatorType = function(config) {
    TU.assertKind(config.isType, Function);
    TU.assertKind(config.validate, Function);
    return validatorTypes.unshift(config);
  };
  addValidatorType({
    isType: function(type) {
      return TU.isType(type, Array);
    },
    validate: validateWithArray = function(value, types, key) {
      var error, typeNames;
      if (types.length === 0) {
        return;
      }
      if (types.length === 1) {
        return TU.assertType(value, types[0], key);
      }
      if (TU.isType(value, types)) {
        return;
      }
      key = key != null ? "'" + key + "'" : "This property";
      typeNames = getTypeNames(types);
      error = TypeError(key + " must be a " + typeNames);
      return throwFailure(error, {
        key: key,
        value: value,
        types: types
      });
    }
  });
  addValidatorType({
    isType: function(type) {
      return TU.isKind(type, Function);
    },
    validate: validateWithFunction = function(value, type, key) {
      return type(value, key);
    }
  });
  validateType = function(value, type, key) {
    var error, i, isType, len, ref, validate;
    for (i = 0, len = validatorTypes.length; i < len; i++) {
      ref = validatorTypes[i], isType = ref.isType, validate = ref.validate;
      if (isType(type)) {
        return validate(value, type, key);
      }
    }
    error = TypeError("Invalid validator type!");
    return throwFailure(error, {
      key: key,
      value: value,
      type: type
    });
  };
  validateTypes = function(obj, types, keyPath) {
    var error, key, type, value;
    TU.assertKind(obj, Object, keyPath);
    TU.assertType(types, Object);
    for (key in types) {
      type = types[key];
      value = obj[key];
      if (keyPath != null) {
        key = keyPath + "." + key;
      }
      try {
        validateType(value, type, key);
      } catch (_error) {
        error = _error;
        throwFailure(error, {
          obj: obj,
          types: types
        });
      }
    }
  };
  return {
    validateTypes: validateTypes,
    addValidatorType: addValidatorType
  };
};

//# sourceMappingURL=../../map/src/validation.map
