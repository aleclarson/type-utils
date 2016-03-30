var NamedFunction, Validator, WeakMap, setKind, setType;

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

setKind(Validator, Function);

Validator.Type = NamedFunction("ValidatorType", function(name, constructor) {
  var type;
  type = NamedFunction(name, function() {
    var validator;
    validator = constructor.apply(null, arguments);
    validator.name = name;
    return setType(validator, type);
  });
  setKind(type, Validator);
  type[Validator.type] = true;
  return type;
});

Validator.type = Symbol("Validator");

//# sourceMappingURL=../../../map/src/types/Validator.map
