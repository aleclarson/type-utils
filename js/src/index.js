var define, inits;

require("lotus-require");

inits = [require("./type"), require("./kind"), require("./assertion"), require("./validation"), require("./types")];

define = require("define");

define(exports, function() {
  var i, init, len;
  this.options = {
    frozen: true
  };
  for (i = 0, len = inits.length; i < len; i++) {
    init = inits[i];
    this(init(exports));
  }
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
