var isConstructor, throwFailure;

throwFailure = require("failure").throwFailure;

isConstructor = require("./isConstructor");

module.exports = function(invariant, reason) {
  var error, info;
  if (invariant) {
    return;
  }
  if (isConstructor(reason, Object)) {
    info = reason;
    reason = info.reason;
    delete info.reason;
  } else if (isConstructor(reason, Function)) {
    info = reason();
    reason = info.reason;
    delete info.reason;
  }
  error = Error(reason || "Assertion failed.");
  error.skip = (info != null ? info.skip : void 0) || 0;
  error.skip += 2;
  return throwFailure(error, info);
};

//# sourceMappingURL=../../../map/src/core/assert.map
