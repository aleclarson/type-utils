
{ throwFailure } = require "failure"

Validator = require "../types/Validator"

module.exports = Validator.Type "Kind", (type) ->

  validate: (value, key) ->
    return yes if value instanceof type
    return { key, value, type }

  fail: (values) ->
    if values.key then error = TypeError "'#{values.key}' must inherit from #{type.name}!"
    else error = TypeError "Expected a kind of #{type.name}!"
    throwFailure error, values
