var NamedFunction, define, emptyFunction, inArray, reportFailure;

NamedFunction = require("named-function");

reportFailure = require("report-failure");

emptyFunction = require("emptyFunction");

inArray = require("in-array");

define = require("define");

module.exports = function(TU) {
  var Any, AnyValidator, Kind, Nan, OneOf, Shape, Validator, Void;
  Void = NamedFunction("Void", emptyFunction);
  Nan = NamedFunction("Nan", emptyFunction.thatReturns(NaN));
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
  AnyValidator = Validator("AnyValidator", function() {
    return NamedFunction("Any", emptyFunction);
  });
  Any = AnyValidator();
  Kind = Validator("Kind", function(type) {
    var validateKind;
    return NamedFunction(type.name + "_Kind", validateKind = function(value, key) {
      var error, name;
      if (TU.isKind(value, type)) {
        return;
      }
      name = key != null ? "'" + key + "'" : "This property";
      error = TypeError(name + " must inherit from " + type.name + ".");
      return reportFailure(error, {
        key: key,
        value: value,
        type: type
      });
    });
  });
  OneOf = Validator("OneOf", function(possibleValues) {
    var validateOneOf;
    return validateOneOf = function(value, key) {
      var error, name;
      if (inArray(possibleValues, value)) {
        return;
      }
      name = key != null ? "'" + key + "'" : "This property";
      error = TypeError(name + " has an invalid value.");
      return reportFailure(error, {
        key: key,
        value: value,
        possibleValues: possibleValues
      });
    };
  });
  Shape = Validator("Shape", function(shape) {
    var shapeKeys, validateShape;
    shapeKeys = Shape.gatherKeys(shape);
    return validateShape = function(value, key) {
      var error, i, keyPath, len, ref;
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
        keyPath.push(key);
        key = keyPath.join(".");
        error = TypeError("'" + key + "' is not a valid key.");
        reportFailure(error, {
          key: key,
          value: value,
          possibleKeys: shapeKeys
        });
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
    Nan: Nan,
    Any: Any,
    Kind: Kind,
    OneOf: OneOf,
    Shape: Shape,
    Validator: Validator
  };
};

//# sourceMappingURL=../../map/src/types.map
