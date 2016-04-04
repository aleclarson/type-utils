var Validator, emptyFunction;

emptyFunction = require("emptyFunction");

Validator = require("./Validator");

module.exports = Validator("Any", {
  validate: emptyFunction.thatReturnsTrue
});

//# sourceMappingURL=../../../map/src/types/Any.map
