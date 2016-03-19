
inArray = require "in-array"

VALUE_TYPES = [ Number, String, Boolean ]

module.exports = (TU) ->

  getKind: (type) ->
    prototype = type and type.prototype
    TU.assert prototype, "Expected a constructor type!"
    return null if type is Object
    TU.getType prototype.__proto__

  setKind: (type, kind) ->
    TU.setType type.prototype, kind
    type

  isKind: (value, type) ->
    value instanceof type

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
