
isValidator = require "./isValidator"
assertType = require "./assertType"

module.exports = (obj, types) ->

  if isValidator types
    throw Error "'You must use 'assertType()' if you want to use a Validator!"

  assertType obj, Object
  assertType types, Object

  for key, type of types
    assertType obj[key], type, { key, obj, types }
  return
