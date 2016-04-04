
Validator = require "./Validator"

module.exports =
Void = Validator "Void",

  getName: -> "undefined"

  validate: (value, key) ->
    return yes if value is undefined
    return { key, value, type: Void }

  fail: (values) ->
    error = TypeError "Expected an undefined value!"
    throwFailure error, values
