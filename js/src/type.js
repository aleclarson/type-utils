var getTypeNames, initValidation, reportFailure, setType;

reportFailure = require("report-failure");

setType = require("set-type");

getTypeNames = require("./helpers").getTypeNames;

initValidation = require("./validation");

module.exports = function(TU) {
  var addValidatorType, assertReturnType, assertType, compareTypes, getType, isNan, isType, ref, testType, validateTypes;
  ref = initValidation(TU), validateTypes = ref.validateTypes, addValidatorType = ref.addValidatorType;
  isNan = function(value, ctr) {
    if ((ctr === Object) || (ctr === String) || (value instanceof Object)) {
      return false;
    }
    return isNaN(value);
  };
  getType = function(value) {
    var ctr;
    if (value == null) {
      return TU.Void;
    }
    ctr = value.constructor;
    if (ctr == null) {
      return null;
    }
    if (isNan(value, ctr)) {
      return TU.Nan;
    }
    return ctr;
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
    var error;
    if (type instanceof TU.Validator) {
      try {
        type(value);
      } catch (_error) {
        error = _error;
        error["catch"]();
        return false;
      }
      return true;
    } else {
      if (compare == null) {
        compare = TU.compareTypes;
      }
      return compare(type, TU.getType(value));
    }
  };
  compareTypes = {
    frozen: false,
    value: function(a, b) {
      return a === b;
    }
  };
  assertType = function(value, type, keyPath) {
    var error, passed;
    if (type instanceof TU.Validator) {
      return type(value);
    }
    try {
      passed = TU.isType(value, type);
    } catch (_error) {}
    if (passed === true) {
      return;
    }
    error = TypeError(keyPath != null ? "'" + keyPath + "' must be a " + (getTypeNames(type)) + "." : "Expected a " + (getTypeNames(type)) + ".");
    return reportFailure(error, {
      key: keyPath,
      value: value,
      type: type
    });
  };
  assertReturnType = function(value, type, keyPath) {
    var error, passed;
    try {
      passed = TU.isType(value, type);
    } catch (_error) {}
    if (passed === true) {
      return;
    }
    error = TypeError(keyPath != null ? "'" + keyPath + "' must return a " + (getTypeNames(type)) + "." : "Expected a " + (getTypeNames(type)) + " to be returned.");
    return reportFailure(error, {
      key: keyPath,
      value: value,
      type: type
    });
  };
  return {
    getType: getType,
    setType: setType,
    isType: isType,
    testType: testType,
    compareTypes: compareTypes,
    assertType: assertType,
    assertReturnType: assertReturnType,
    validateTypes: validateTypes,
    addValidatorType: addValidatorType
  };
};

//# sourceMappingURL=../../map/src/type.map
