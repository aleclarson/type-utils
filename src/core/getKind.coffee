
getConstructor = require "./getConstructor"
assert = require "./assert"

module.exports = (type) ->
  prototype = type and type.prototype
  assert prototype, "Expected a constructor type!"
  return null if type is Object
  return getConstructor prototype.__proto__
