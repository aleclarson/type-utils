
Validator = require "../types/Validator"

module.exports =
isValidator = (value) ->
  value and value.constructor[Validator.type] is yes
