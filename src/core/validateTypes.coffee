
assertType = require "./assertType"

module.exports = (obj, types) ->
  assertType obj, Object
  assertType types, Object
  for key, type of types
    assertType obj[key], type, { key, obj, types }
  return
