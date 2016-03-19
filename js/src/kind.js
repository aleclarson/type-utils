var VALUE_TYPES, inArray;

inArray = require("in-array");

VALUE_TYPES = [Number, String, Boolean];

module.exports = function(TU) {
  return {
    getKind: function(type) {
      var prototype;
      prototype = type && type.prototype;
      TU.assert(prototype, "Expected a constructor type!");
      if (type === Object) {
        return null;
      }
      return TU.getType(prototype.__proto__);
    },
    setKind: function(type, kind) {
      TU.setType(type.prototype, kind);
      return type;
    },
    isKind: function(value, type) {
      return value instanceof type;
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
