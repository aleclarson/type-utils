
{ throwFailure } = require "failure"

isConstructor = require "./isConstructor"

module.exports = (invariant, reason) ->

  return if invariant

  if isConstructor reason, Object
    info = reason
    reason = info.reason
    delete info.reason

  else if isConstructor reason, Function
    info = reason()
    reason = info.reason
    delete info.reason

  error = Error reason or "Assertion failed."

  error.skip = info?.skip or 0
  error.skip += 2

  throwFailure error, info
