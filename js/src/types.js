var NamedFunction, define, emptyFunction, inArray, throwFailure;

throwFailure = require("failure").throwFailure;

NamedFunction = require("named-function");

emptyFunction = require("emptyFunction");

inArray = require("in-array");

define = require("define");

module.exports = function(TU) {
  var Any, AnyValidator, ArrayOf, Kind, Nan, OneOf, Shape, Validator, Void;
  Void = NamedFunction("Void", function() {});
  Nan = NamedFunction("Nan", function() {
    return NaN;
  });
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
    return NamedFunction("Any", function() {});
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
      return throwFailure(error, {
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
      return throwFailure(error, {
        key: key,
        value: value,
        possibleValues: possibleValues
      });
    };
  });
  Shape = Validator("Shape", function(shape) {
    var validateShape;
    TU.assertType(shape, Object);
    return validateShape = function(value, key) {
      TU.assertType(value, Object, key);
      return TU.validateTypes(value, shape, key);
    };
  });
  ArrayOf = Validator("ArrayOf", function(types) {
    var validateArray;
    return validateArray = function(array, key) {
      var error, index, value;
      if (key == null) {
        key = "array";
      }
      TU.assertType(array, Array, key);
      for (index in array) {
        value = array[index];
        try {
          TU.assertType(value, types, key + "[" + index + "]");
        } catch (_error) {
          error = _error;
          throwFailure(error, {
            index: index,
            array: array
          });
        }
      }
    };
  });
  return {
    Any: Any,
    Nan: Nan,
    Void: Void,
    Kind: Kind,
    OneOf: OneOf,
    Shape: Shape,
    ArrayOf: ArrayOf,
    Validator: Validator
  };
};

//# sourceMappingURL=../../map/src/types.map
