var VALUE_TYPES, getTypeNames, inArray, reportFailure;

reportFailure = require("report-failure");

inArray = require("in-array");

getTypeNames = require("./helpers").getTypeNames;

VALUE_TYPES = [Number, String, Boolean];

module.exports = function(TU) {
  return {
    getKind: function(type) {
      if ((type == null) || type === Object) {
        return null;
      }
      return TU.getType(type.prototype.__proto__);
    },
    setKind: function(type, kind) {
      TU.setType(type.prototype, kind);
      return type;
    },
    isKind: function(value, type) {
      return value instanceof type;
    },
    assertKind: function(value, validator, keyPath) {
      var error, prefix;
      if (TU.isKind(value, validator)) {
        return;
      }
      if (keyPath != null) {
        prefix = "'" + keyPath + "' must inherit from ";
      } else {
        prefix = "Expected a kind of ";
      }
      error = TypeError("" + prefix + (getTypeNames(validator)) + ".");
      return reportFailure(error, {
        key: keyPath,
        value: value,
        validator: validator
      });
    },
    testKind: function(type, kind, compare) {
      if (compare == null) {
        compare = TU.compareTypes;
      }
      while (true) {
        if (compare(type, kind)) {
          return true;
        }
        if (type === Object) {
          break;
        }
        if (inArray(VALUE_TYPES, type)) {
          return false;
        }
        type = TU.getKind(type);
        if (type === null) {
          break;
        }
      }
      return false;
    },
    getKinds: function(type) {
      var types;
      types = [];
      while (true) {
        types.push(type);
        type = TU.getKind(type);
        if (type == null) {
          break;
        }
      }
      return types;
    }
  };
};

//# sourceMappingURL=../../map/src/kind.map
