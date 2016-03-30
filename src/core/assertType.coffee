
{ throwFailure } = require "failure"

Accumulator = require "accumulator"

isConstructor = require "./isConstructor"
isValidator = require "./isValidator"
errorTypes = require "../errorTypes"
isType = require "./isType"

module.exports = (value, type, key) ->

  if isValidator type
    result = type.validate value, key
    if result isnt yes
      validatorFailed type, result, key

  else unless isType value, type
    invalidType type, value, key

  return

validatorFailed = (type, result, key) ->

  accumulated = Accumulator()
  accumulated.push result

  if isConstructor key, Object
    accumulated.push key
    key = key.key

  type.fail accumulated.flatten()

invalidType = (type, value, key) ->

  accumulated = Accumulator()
  accumulated.push { type, value }

  if isConstructor key, Object
    accumulated.push key
    key = key.key

  error = errorTypes.invalidType type, key
  throwFailure error, accumulated.flatten()
