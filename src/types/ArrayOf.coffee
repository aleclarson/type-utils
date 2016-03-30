
{ throwFailure } = require "failure"

errorTypes = require "../errorTypes"
Validator = require "../types/Validator"
isType = require "../core/isType"

module.exports = Validator.Type "ArrayOf", (types) ->

  validate: (array, key = "array") ->

    unless Array.isArray array
      return { key, value: array, type: Array }

    for index, value of array
      continue if isType value, types
      key += "[#{index}]"
      return { key, value, type: types }

    return yes

  fail: (values) ->
    error = errorTypes.invalidType values.type, values.key
    throwFailure error, values
