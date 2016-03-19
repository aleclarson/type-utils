var checkNanSafely;

if (global.Symbol == null) {
  global.Symbol = {};
}

checkNanSafely = function(value, ctr) {
  if (!isNaN(value)) {
    return false;
  }
  if (value instanceof Object) {
    return false;
  }
  if (value === ctr.prototype) {
    return false;
  }
  if (ctr === String) {
    return false;
  }
  if (ctr === Symbol) {
    return false;
  }
  return true;
};

module.exports = function(TU) {
  return {
    getType: function(value) {
      var ctr;
      if (value === void 0) {
        return TU.Void;
      }
      if (value === null) {
        return TU.Null;
      }
      ctr = value.constructor;
      if (!ctr) {
        return null;
      }
      if (checkNanSafely(value, ctr)) {
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
          if (typeof error["catch"] === "function") {
            error["catch"]();
          }
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
