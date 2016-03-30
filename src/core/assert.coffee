
{ throwFailure } = require "failure"

isConstructor = require "./isConstructor"

module.exports = (invariant, reason) ->
  return if invariant
  if isConstructor reason, Object
    data = reason
    reason = data.reason
    delete data.reason
  error = Error reason or "Assertion failed."
  throwFailure error, data
