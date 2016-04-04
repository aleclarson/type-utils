
NamedFunction = require "named-function"

Validator = require "./Validator"
isNan = require "../core/isNan"

module.exports =
Nan = Validator "Nan",

  getName: -> "NaN"

  validate: (value, key) ->
    return yes if isNan value
    return { key, value, type: Nan }

  fail: (values) ->
    error = TypeError "Expected a number error!"
    throwFailure error, values
