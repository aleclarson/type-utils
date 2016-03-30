
{ throwFailure } = require "failure"

errorTypes = require "../errorTypes"
Validator = require "../types/Validator"
isType = require "../core/isType"
Void = require "../types/Void"

module.exports = Validator.Type "Maybe", (type) ->

  validate: (value, key) ->
    return yes if value is undefined
    return yes if isType value, type
    return { key, value, type }

  fail: (values) ->
    error = errorTypes.invalidType [ type, Void ], values.key
    throwFailure error, values
