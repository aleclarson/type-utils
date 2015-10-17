var NamedFunction, define, emptyFunction, inArray;

NamedFunction = require("named-function");

emptyFunction = require("emptyFunction");

inArray = require("in-array");

define = require("define");

module.exports = function() {
  return {
    OneOf: NamedFunction("OneOf", function(possibleValues) {
      return function(value) {
        return inArray(possibleValues, value);
      };
    }),
    Void: NamedFunction("Void", emptyFunction)
  };
};

//# sourceMappingURL=../../map/src/types.map
