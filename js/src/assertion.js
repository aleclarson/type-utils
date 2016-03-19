var getTypeNames, throwFailure;

throwFailure = require("failure").throwFailure;

getTypeNames = require("./helpers").getTypeNames;

module.exports = function(TU) {
  return {
    assert: function(invariant, reason) {
      var data;
      if (invariant) {
        return;
      }
      if (TU.isType(reason, Object)) {
        data = reason;
        reason = data.reason;
        delete data.reason;
      }
      if (reason == null) {
        reason = "Assertion failed.";
      }
      return throwFailure(Error(reason), data);
    },
    assertType: function(value, type, key) {
      var data, passed, reason;
      if (TU.isKind(type, TU.Validator)) {
        return type(value, key);
      }
      try {
        passed = TU.isType(value, type);
      } catch (_error) {}
      if (passed === true) {
        return;
      }
      data = TU.isType(key, Object) ? key : {
        key: key
      };
      data.value = value;
      data.type = type;
      reason = data.key != null ? "'" + data.key + "' must be a " + (getTypeNames(type)) + "." : "Expected a " + (getTypeNames(type)) + ".";
      return throwFailure(TypeError(reason), data);
    },
    assertReturnType: function(value, type, key) {
      var data, passed, reason;
      if (TU.isKind(type, TU.Validator)) {
        return type(value, key);
      }
      try {
        passed = TU.isType(value, type);
      } catch (_error) {}
      if (passed === true) {
        return;
      }
      data = TU.isType(key, Object) ? key : {
        key: key
      };
      data.value = value;
      data.type = type;
      reason = data.key != null ? "'" + data.key + "' must return a " + (getTypeNames(type)) + "." : "Expected a " + (getTypeNames(type)) + " to be returned.";
      return throwFailure(TypeError(reason), data);
    },
    assertKind: function(value, type, key) {
      var data, reason;
      if (TU.isKind(value, type)) {
        return;
      }
      data = TU.isType(key, Object) ? key : {
        key: key
      };
      data.value = value;
      data.type = type;
      reason = data.key != null ? "'" + data.key + "' must inherit from " + (getTypeNames(type)) + "." : "Expected a kind of " + (getTypeNames(type)) + ".";
      return throwFailure(TypeError(reason), data);
    }
  };
};

//# sourceMappingURL=../../map/src/assertion.map
