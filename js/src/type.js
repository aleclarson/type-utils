module.exports = function(TU) {
  var _validateType;
  _validateType = function(value, spec, keyPath) {
    var lastType, types;
    switch (TU.getType(spec)) {
      case Array:
        types = spec;
        if (types.length === 0) {
          return;
        }
        if (types.length === 1) {
          global.typeConflict = {
            value: value,
            type: types[0]
          };
          TU.assertType(value, types[0], keyPath);
          return;
        }
        if (!TU.isType(value, types)) {
          keyPath = keyPath != null ? "'" + keyPath + "'" : "This property";
          types = types.map(function(type) {
            return type.name;
          });
          if (types.length === 2) {
            types = types[0] + " or " + types[1] + ".";
          } else {
            lastType = types.pop();
            types = types.join(", ");
            types += ", or " + lastType + ".";
          }
          global.typeConflict = {
            value: value,
            types: types.map(function(type) {
              return type;
            })
          };
          throw TypeError(keyPath + " must be a " + types);
        }
        break;
      case Function:
        return spec(value, keyPath);
      default:
        global._args = arguments;
        throw TypeError("'spec' must be an Array or Function.");
    }
  };
  return {
    getType: function(value) {
      if (value == null) {
        return TU.Void;
      }
      return value.constructor || null;
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
      return TU.testType(value, type, compare);
    },
    assertType: function(value, type, keyPath) {
      var expected, prefix;
      if (TU.isType(value, type)) {
        return;
      }
      global.failedAssertion = {
        value: value,
        type: type,
        keyPath: keyPath
      };
      prefix = keyPath != null ? "'" + keyPath + "' must be" : "Expected";
      expected = TU.isType(type, Array) ? type.map(function(t) {
        return t.name;
      }).join(", ") : expected = type.name;
      throw TypeError(prefix + (" a " + expected + "."));
    },
    validateTypes: function(obj, specs, keyPath) {
      var key, spec, value;
      if (specs == null) {
        return;
      }
      TU.assertType(specs, Object, keyPath);
      for (key in specs) {
        spec = specs[key];
        value = obj[key];
        if (keyPath != null) {
          key = keyPath + "." + key;
        }
        if (TU.isType(spec, Object)) {
          if (value == null) {
            continue;
          }
          TU.assertType(value, Object, key);
          TU.validateTypes(value, spec, key);
        } else {
          _validateType(value, spec, key);
        }
      }
    },
    testType: function(value, type, compare) {
      if (compare == null) {
        compare = TU.compareTypes;
      }
      return compare(type, TU.getType(value));
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
