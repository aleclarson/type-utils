
{ throwFailure } = require "failure"

Accumulator = require "accumulator"

isConstructor = require "./isConstructor"
isValidator = require "./isValidator"
errorTypes = require "../errorTypes"
isType = require "./isType"

module.exports = (value, type, key) ->

  if isConstructor key, Object
    relevantData = key
    key = relevantData.key
  else relevantData = { key }

  unless type
    throwFailure Error("Must provide a 'type'!"), { value, type, key, relevantData }

  if isValidator type
    result = type.validate value, key
    if result isnt yes
      throwFailedValidator type, result, relevantData

  else unless isType value, type
    throwInvalidType type, value, relevantData

  return

throwFailedValidator = (type, result, relevantData) ->

  accumulated = Accumulator()
  accumulated.push result
  accumulated.push relevantData if relevantData

  type.fail accumulated.flatten()

throwInvalidType = (type, value, relevantData) ->

  accumulated = Accumulator()
  accumulated.push { type, value }
  accumulated.push relevantData if relevantData

  error = errorTypes.invalidType type, relevantData.key
  throwFailure error, accumulated.flatten()
