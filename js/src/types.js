var NamedFunction, define, emptyFunction, inArray;

NamedFunction = require("named-function");

emptyFunction = require("emptyFunction");

inArray = require("in-array");

define = require("define");

module.exports = function(TU) {
  var Kind, OneOf, Shape, Validator, Void;
  Void = NamedFunction("Void", emptyFunction);
  Validator = NamedFunction("Validator", function(name, constructor) {
    var type;
    type = NamedFunction(name, function() {
      var validate;
      validate = constructor.apply(this, arguments);
      return TU.setType(validate, type);
    });
    return TU.setKind(type, Validator);
  });
  TU.setKind(Validator, Function);
  Kind = Validator("Kind", function(type) {
    var validateKind;
    return NamedFunction(type.name + "_Kind", validateKind = function(value, key) {
      if (TU.testKind(TU.getType(value), type)) {
        return;
      }
      if (global.failure == null) {
        global.failure = {
          key: key,
          value: value,
          type: type
        };
      }
      key = key != null ? "'" + key + "'" : "This property";
      throw TypeError(key + " must inherit from " + type.name + ".");
    });
  });
  OneOf = Validator("OneOf", function(possibleValues) {
    var validateOneOf;
    return validateOneOf = function(value, key) {
      if (inArray(possibleValues, value)) {
        return;
      }
      if (global.failure == null) {
        global.failure = {
          key: key,
          value: value,
          possibleValues: possibleValues
        };
      }
      key = key != null ? "'" + key + "'" : "This property";
      throw TypeError(key + " has an invalid value.");
    };
  });
  Shape = Validator("Shape", function(shape) {
    var shapeKeys, validateShape;
    shapeKeys = Shape.gatherKeys(shape);
    return validateShape = function(value, key) {
      var i, keyPath, len, ref;
      if (value == null) {
        return;
      }
      TU.assertType(value, Object, key);
      keyPath = [];
      if (key != null) {
        keyPath.push(key);
      }
      ref = Object.keys(value);
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        if (inArray(shapeKeys, key)) {
          continue;
        }
        if (global.failure == null) {
          global.failure = {
            key: key,
            value: value,
            possibleKeys: shapeKeys
          };
        }
        keyPath.push(key);
        key = keyPath.join(".");
        throw TypeError("'" + key + "' is not a valid key.");
      }
    };
  });
  Shape.gatherKeys = function(obj) {
    var array, i, keys, len;
    if (TU.isType(obj, Array)) {
      array = obj;
      keys = [];
      for (i = 0, len = array.length; i < len; i++) {
        obj = array[i];
        keys = keys.concat(Shape.gatherKeys(obj));
      }
      return keys;
    } else if (TU.isKind(obj, Object)) {
      return keys = Object.keys(obj);
    } else {
      throw TypeError("Expected an Object or Array.");
    }
  };
  return {
    Void: Void,
    Kind: Kind,
    OneOf: OneOf,
    Shape: Shape,
    Validator: Validator
  };
};

//# sourceMappingURL=../../map/src/types.map
