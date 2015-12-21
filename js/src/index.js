var define, definitions;

require("lotus-require");

define = require("define");

definitions = [require("./type"), require("./kind"), require("./types")];

define(module.exports, function() {
  var getDefinition, i, len, results;
  this.options = {
    frozen: true
  };
  results = [];
  for (i = 0, len = definitions.length; i < len; i++) {
    getDefinition = definitions[i];
    results.push(this(getDefinition(module.exports)));
  }
  return results;
});

exports.any = function(values) {
  var i, len, value;
  for (i = 0, len = values.length; i < len; i++) {
    value = values[i];
    if (value != null) {
      return value;
    }
  }
};

//# sourceMappingURL=../../map/src/index.map
