var Validator, emptyFunction;

emptyFunction = require("emptyFunction");

Validator = require("../types/Validator");

module.exports = Validator("Any", {
  validate: emptyFunction.thatReturnsTrue
});

//# sourceMappingURL=../../../map/src/types/Any.map
