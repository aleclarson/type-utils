
var exports = require('./js/src/index');
for (var key in exports) {
  global[key] = exports[key];
}
