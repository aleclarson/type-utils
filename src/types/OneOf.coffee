
{ throwFailure } = require "failure"

inArray = require "in-array"

Validator = require "../types/Validator"

module.exports = Validator.Type "OneOf", (expectedValues) ->

  validate: (value, key) ->
    return yes if inArray expectedValues, value
    return { key, value, expectedValues }

  fail: (values) ->
    if values.key then error = TypeError "Unexpected value!"
    else error = TypeError "'#{key}' has an unexpected value!"
    throwFailure error, values
