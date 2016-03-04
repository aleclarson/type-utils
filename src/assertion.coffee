
{ throwFailure } = require "failure"

{ getTypeNames } = require "./helpers"

module.exports = (TU) ->

  assert: (invariant, reason) ->
    return if invariant
    if TU.isType reason, Object
      data = reason
      reason = data.reason
      delete data.reason
    error = Error reason ?= "Assertion failed."
    throwFailure error, data

  assertType: (value, type, key) ->

    return type value, key if TU.isKind type, TU.Validator
    try passed = TU.isType value, type
    return if passed is yes

    data = if (TU.isType key, Object) then key else { key }
    data.value = value
    data.type = type
    error = TypeError(
      if data.key? then "'#{data.key}' must be a #{getTypeNames type}."
      else "Expected a #{getTypeNames type}."
    )
    throwFailure error, data

  assertReturnType: (value, type, key) ->

    try passed = TU.isType value, type
    return if passed is yes

    data = if (TU.isType key, Object) then key else { key }
    data.value = value
    data.type = type
    error = TypeError(
      if data.key? then "'#{data.key}' must return a #{getTypeNames type}."
      else "Expected a #{getTypeNames type} to be returned."
    )
    throwFailure error, data

  assertKind: (value, type, key) ->

    return if TU.isKind value, type

    data = if (TU.isType key, Object) then key else { key }
    data.value = value
    data.type = type
    error = TypeError(
      if data.key? then "'#{data.key}' must inherit from #{getTypeNames type}."
      else "Expected a kind of #{getTypeNames type}."
    )
    throwFailure error, data
