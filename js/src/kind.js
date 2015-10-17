module.exports = function(TU) {
  return {
    Kind: function(kind) {
      return function(value, key) {
        if (TU.testKind(TU.getType(value), kind)) {
          return;
        }
        key = key != null ? "'" + key + "'" : "This property";
        throw TypeError(key + " must inherit from " + kind.name + ".");
      };
    },
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
    assertKind: function(value, type, keyPath) {
      var expected, prefix;
      if (TU.isKind(value, type)) {
        return;
      }
      prefix = keyPath != null ? "'" + keyPath + "' must be" : "Expected";
      if (TU.isType(type, Array)) {
        expected = type.map(function(t) {
          return t.name;
        }).join(", ");
      } else {
        expected = type.name;
      }
      global.failedAssertion = {
        value: value,
        type: type,
        keyPath: keyPath
      };
      throw TypeError(prefix + (" a " + expected + "."));
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
