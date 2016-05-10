
{ throwFailure } = require "failure"

inArray = require "in-array"

assertType = require "../core/assertType"
Validator = require "./Validator"

module.exports = Validator.Type "OneOf", (name, values) ->

  assertType name, String
  assertType values, Array

  values: values

  getName: -> name

  validate: (value, key) ->
    return yes if inArray values, value
    return { key, value, expected: values }

  fail: (values) ->
    if values.key then reason = "'#{values.key}' must be a #{name}!"
    else reason = "Expected a #{name}!"
    error = TypeError reason
    throwFailure error, values
