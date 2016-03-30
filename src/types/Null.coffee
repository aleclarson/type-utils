
Validator = require "../types/Validator"

module.exports =
Null = Validator "Null",

  validate: (value, key) ->
    return yes if value is null
    return { key, value, type: Null }

  fail: (values) ->
    error = TypeError "Expected a null value!"
    throwFailure error, values
