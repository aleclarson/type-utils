var Validator, isValidator;

Validator = require("../types/Validator");

module.exports = isValidator = function(value) {
  return value && value.constructor[Validator.type] === true;
};

//# sourceMappingURL=../../../map/src/core/isValidator.map
