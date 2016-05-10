
{ throwFailure } = require "failure"

formatType = require "../core/formatType"
errorTypes = require "../errorTypes"
Validator = require "./Validator"
isType = require "../core/isType"
Void = require "../types/Void"

module.exports = Validator.Type "Maybe", (type) ->

  type: type

  getName: -> formatType(type) + "?"

  validate: (value, key) ->
    return yes if value is undefined
    return yes if isType value, type
    return { key, value, type }

  fail: (values) ->
    error = errorTypes.invalidType [ type, Void ], values.key
    throwFailure error, values
