var NamedFunction, Validator, WeakMap, define, setKind, setType;

NamedFunction = require("named-function");

WeakMap = require("weak-map");

setKind = require("../core/setKind");

setType = require("../core/setType");

module.exports = Validator = NamedFunction("Validator", function(name, validator) {
  var type;
  type = Validator.Type(name, function() {
    return validator;
  });
  return type();
});

define = Object.defineProperty;

define(Validator.prototype, "name", {
  configurable: false,
  enumerable: true,
  get: function() {
    return this.getName();
  }
});

Validator.Type = NamedFunction("ValidatorType", function(name, constructor) {
  var type;
  type = NamedFunction(name, function() {
    var validator;
    validator = constructor.apply(null, arguments);
    return setType(validator, type);
  });
  setKind(type, Validator);
  type[Validator.type] = true;
  type.prototype.getName = function() {
    return name;
  };
  return type;
});

Validator.type = Symbol("Validator");

//# sourceMappingURL=../../../map/src/types/Validator.map
