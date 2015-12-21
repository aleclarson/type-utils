
reportFailure = require "report-failure"
inArray = require "in-array"

{ getTypeNames } = require "./helpers"

VALUE_TYPES = [ Number, String, Boolean ]

module.exports = (TU) ->

  getKind: (type) ->
    return null if !type? or type is Object
    TU.getType type.prototype.__proto__

  setKind: (type, kind) ->
    TU.setType type.prototype, kind
    type

  isKind: (value, type) ->
    value instanceof type

  assertKind: (value, validator, keyPath) ->
    return if TU.isKind value, validator
    if keyPath? then prefix = "'#{keyPath}' must inherit from "
    else prefix = "Expected a kind of "
    error = TypeError "#{prefix}#{getTypeNames validator}."
    reportFailure error, { key: keyPath, value, validator }

  testKind: (type, kind, compare) ->
    compare ?= TU.compareTypes
    loop
      return yes if compare type, kind
      break if type is Object
      return no if inArray VALUE_TYPES, type
      type = TU.getKind type
      break if type is null
    no

  getKinds: (type) ->
    types = []
    loop
      types.push type
      type = TU.getKind type
      break unless type?
    types
