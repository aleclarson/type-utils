
{ throwFailure } = require "failure"

formatType = require "../core/formatType"
errorTypes = require "../errorTypes"
Validator = require "./Validator"
isType = require "../core/isType"

module.exports = Validator.Type "ArrayOf", (type) ->

  type: type

  getName: -> "an array of " + formatType type

  validate: (array, key = "array") ->

    unless Array.isArray array
      return { key, value: array, type: Array }

    for index, value of array
      continue if isType value, type
      key += "[#{index}]"
      return { key, value, type }

    return yes

  fail: (values) ->
    error = errorTypes.invalidType values.type, values.key
    throwFailure error, values
