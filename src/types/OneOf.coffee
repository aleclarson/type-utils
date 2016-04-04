
{ throwFailure } = require "failure"

inArray = require "in-array"

assertType = require "../core/assertType"
Validator = require "./Validator"

module.exports = Validator.Type "OneOf", (name, expectedValues) ->

  assertType name, String
  assertType expectedValues, Array

  expectedValues: expectedValues

  getName: -> name

  validate: (value, key) ->
    return yes if inArray expectedValues, value
    return { key, value, expectedValues }

  fail: (values) ->
    unless values.key then reason = "Unexpected value!"
    else reason = "'" + values.key + "' has an unexpected value!"
    error = TypeError reason
    throwFailure error, values
