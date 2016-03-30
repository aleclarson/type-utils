var isConstructor, throwFailure;

throwFailure = require("failure").throwFailure;

isConstructor = require("./isConstructor");

module.exports = function(invariant, reason) {
  var data, error;
  if (invariant) {
    return;
  }
  if (isConstructor(reason, Object)) {
    data = reason;
    reason = data.reason;
    delete data.reason;
  }
  error = Error(reason || "Assertion failed.");
  return throwFailure(error, data);
};

//# sourceMappingURL=../../../map/src/core/assert.map
