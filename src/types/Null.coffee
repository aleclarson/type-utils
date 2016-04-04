
Validator = require "./Validator"

module.exports =
Null = Validator "Null",

  getName: -> "null"

  validate: (value, key) ->
    return yes if value is null
    return { key, value, type: Null }

  fail: (values) ->
    error = TypeError "Expected a null value!"
    throwFailure error, values
