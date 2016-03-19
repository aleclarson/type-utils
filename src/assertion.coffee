
{ throwFailure } = require "failure"

{ getTypeNames } = require "./helpers"

module.exports = (TU) ->

  assert: (invariant, reason) ->
    return if invariant
    if TU.isType reason, Object
      data = reason
      reason = data.reason
      delete data.reason
    reason ?= "Assertion failed."
    throwFailure Error(reason), data

  assertType: (value, type, key) ->

    if TU.isKind type, TU.Validator
      return type value, key

    try passed = TU.isType value, type
    return if passed is yes

    data = if TU.isType(key, Object) then key else { key }
    data.value = value
    data.type = type
    reason =
      if data.key? then "'#{data.key}' must be a #{getTypeNames type}."
      else "Expected a #{getTypeNames type}."
    throwFailure TypeError(reason), data

  assertReturnType: (value, type, key) ->

    if TU.isKind type, TU.Validator
      return type value, key

    try passed = TU.isType value, type
    return if passed is yes

    data = if TU.isType(key, Object) then key else { key }
    data.value = value
    data.type = type
    reason =
      if data.key? then "'#{data.key}' must return a #{getTypeNames type}."
      else "Expected a #{getTypeNames type} to be returned."
    throwFailure TypeError(reason), data

  assertKind: (value, type, key) ->

    return if TU.isKind value, type

    data = if TU.isType(key, Object) then key else { key }
    data.value = value
    data.type = type
    reason =
      if data.key? then "'#{data.key}' must inherit from #{getTypeNames type}."
      else "Expected a kind of #{getTypeNames type}."
    throwFailure TypeError(reason), data
