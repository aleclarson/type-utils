var getTypeNames, initValidation, setType;

setType = require("set-type");

getTypeNames = require("./helpers").getTypeNames;

initValidation = require("./validation");

module.exports = function(TU) {
  var addValidatorType, assertType, compareTypes, getType, isType, ref, testType, validateTypes;
  ref = initValidation(TU), validateTypes = ref.validateTypes, addValidatorType = ref.addValidatorType;
  getType = function(value) {
    if (value == null) {
      return TU.Void;
    } else if (Number.isNaN(value)) {
      throw Error("NaN indicates a number error.");
    } else {
      return value.constructor || null;
    }
  };
  isType = function(value, type, compare) {
    var i, len, types;
    if (TU.testType(type, Array)) {
      types = type;
      for (i = 0, len = types.length; i < len; i++) {
        type = types[i];
        if (TU.testType(value, type, compare)) {
          return true;
        }
      }
      return false;
    }
    return TU.testType(value, type, compare);
  };
  testType = function(value, type, compare) {
    if (type instanceof TU.Validator) {
      return type(value);
    }
    if (compare == null) {
      compare = TU.compareTypes;
    }
    return compare(type, TU.getType(value));
  };
  compareTypes = {
    frozen: false,
    value: function(a, b) {
      return a === b;
    }
  };
  assertType = function(value, type, keyPath) {
    var passed, prefix;
    try {
      passed = TU.isType(value, type);
    } catch (_error) {}
    if (passed === true) {
      return;
    }
    if (global.failure == null) {
      global.failure = {
        key: keyPath,
        value: value,
        type: type
      };
    }
    if (keyPath != null) {
      prefix = "'" + keyPath + "' must be";
    } else {
      prefix = "Expected";
    }
    throw TypeError(prefix + " a " + (getTypeNames(type)) + ".");
  };
  return {
    getType: getType,
    setType: setType,
    isType: isType,
    testType: testType,
    compareTypes: compareTypes,
    assertType: assertType,
    validateTypes: validateTypes,
    addValidatorType: addValidatorType
  };
};

//# sourceMappingURL=../../map/src/type.map
