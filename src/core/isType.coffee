
getConstructor = require "./getConstructor"
isValidator = require "./isValidator"

module.exports =
isType = (value, type) ->

  if Array.isArray type
    types = type
    return yes for type in types when isType value, type
    return no

  return type.validate(value) is yes if isValidator type

  return no unless value?

  return type is getConstructor value
