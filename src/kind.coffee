
module.exports = (TU) ->

  Kind: (kind) -> (value, key) ->
    return if TU.testKind TU.getType(value), kind
    key = if key? then "'#{key}'" else "This property"
    throw TypeError "#{key} must inherit from #{kind.name}."

  getKind: (type) ->
    return null if !type? or type is Object
    TU.getType type.prototype.__proto__

  setKind: (type, kind) ->
    TU.setType type.prototype, kind
    type

  isKind: (value, type) ->
    value instanceof type

  assertKind: (value, type, keyPath) ->
    return if TU.isKind value, type
    prefix = if keyPath? then "'#{keyPath}' must be" else "Expected"
    if TU.isType type, Array then expected = type.map((t) -> t.name).join ", "
    else expected = type.name
    global.failedAssertion = { value, type, keyPath }
    throw TypeError prefix + " a #{expected}."

  testKind: (type, kind, compare) ->
    compare ?= TU.compareTypes
    loop
      return yes if compare type, kind
      break if type is Object
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
