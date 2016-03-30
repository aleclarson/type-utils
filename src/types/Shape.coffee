
{ throwFailure } = require "failure"

isConstructor = require "../core/isConstructor"
assertType = require "../core/assertType"
errorTypes = require "../errorTypes"
Validator = require "../types/Validator"
isType = require "../core/isType"

module.exports = Validator.Type "Shape", (types) ->

  assertType types, Object

  validate: (obj, key) ->
    unless isConstructor obj, Object
      return { key, value: obj, type: Object }
    for key, type of types
      value = obj[key]
      continue if isType value, type
      return { key, value, type, obj, types }
    return yes

  fail: (values) ->
    error = errorTypes.invalidType values.type, values.key
    throwFailure error, values
