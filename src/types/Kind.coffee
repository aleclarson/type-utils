
{ throwFailure } = require "failure"

Validator = require "./Validator"

module.exports = Validator.Type "Kind", (type) ->

  type: type

  getName: -> "a kind of " + type.getName()

  validate: (value, key) ->
    return yes if value instanceof type
    return { key, value, type }

  fail: (values) ->
    unless values.key then reason = "Expected " + @name + "!"
    else reason = "'" + values.key + "' must be " + @name + "!"
    error = TypeError reason
    throwFailure error, values
