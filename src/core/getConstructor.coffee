
isNan = require "./isNan"
Nan = require "../types/Nan"

module.exports = (value) ->
  ctr = value.constructor
  return null unless ctr
  return Nan if isNan value, ctr
  return ctr
