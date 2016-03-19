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

//# sourceMappingURL=../../map/src/index.map
