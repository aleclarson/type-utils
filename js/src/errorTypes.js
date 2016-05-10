var formatType, inArray, vowels;

inArray = require("in-array");

formatType = require("./core/formatType");

vowels = ["a", "e", "i", "o", "u"];

module.exports = {
  invalidType: function(type, key) {
    var hasVowel, reason;
    type = formatType(type);
    hasVowel = inArray(vowels, type[0].toLowerCase());
    reason = key ? "'" + key + "' must be " : "Expected ";
    reason += hasVowel ? "an " : "a ";
    reason += type + "!";
    return TypeError(reason);
  }
};

//# sourceMappingURL=../../map/src/errorTypes.map
