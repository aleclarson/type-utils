
getProto = require "getProto"

getConstructor = require "./getConstructor"
assert = require "./assert"

module.exports = (type) ->
  prototype = type and type.prototype
  assert prototype, "Expected a constructor type!"
  __proto__ = getProto prototype
  return null unless __proto__
  return getConstructor __proto__
