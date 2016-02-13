var reportFailure;

reportFailure = require("report-failure");

module.exports = function(TU) {
  var isNan;
  isNan = function(value, ctr) {
    if ((ctr === Object) || (ctr === String) || (ctr === Symbol) || (TU.isKind(value, Object))) {
      return false;
    }
    return isNaN(value);
  };
  return {
    getType: function(value) {
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
    },
    setType: require("set-type"),
    isType: function(value, type, compare) {
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
      if ((type === null) || TU.isKind(type, Function)) {
        return TU.testType(value, type, compare);
      }
      throw TypeError("Must pass at least one type (or null) to 'isType'!");
    },
    testType: function(value, type, compare) {
      var error;
      if (TU.isKind(type, TU.Validator)) {
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
    },
    compareTypes: {
      frozen: false,
      value: function(a, b) {
        return a === b;
      }
    }
  };
};

//# sourceMappingURL=../../map/src/type.map
