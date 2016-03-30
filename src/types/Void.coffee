
Validator = require "../types/Validator"

module.exports =
Void = Validator "Void",

  validate: (value, key) ->
    return yes if value is undefined
    return { key, value, type: Void }

  fail: (values) ->
    error = TypeError "Expected an undefined value!"
    throwFailure error, values
