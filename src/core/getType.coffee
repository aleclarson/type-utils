
getConstructor = require "./getConstructor"
Void = require "../types/Void"
Null = require "../types/Null"

module.exports = (value) ->
  return Void if value is undefined
  return Null if value is null
  return getConstructor value
