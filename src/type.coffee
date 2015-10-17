
module.exports = (TU) ->

  _validateType = (value, spec, keyPath) ->

    switch TU.getType spec

      # Support arrays of multiple valid types.
      when Array
        types = spec

        if types.length is 0
          return

        if types.length is 1
          global.typeConflict =
            value: value
            type: types[0]
          TU.assertType value, types[0], keyPath
          return

        unless TU.isType value, types
          keyPath = if keyPath? then "'#{keyPath}'" else "This property"
          types = types.map (type) -> type.name

          if types.length is 2
            types = "#{types[0]} or #{types[1]}."

          else
            lastType = types.pop()
            types = types.join ", "
            types += ", or #{lastType}."

          global.typeConflict =
            value: value
            types: types.map (type) -> type

          throw TypeError "#{keyPath} must be a #{types}"

      # Support custom validators.
      when Function
        spec value, keyPath

      else
        global._args = arguments
        throw TypeError "'spec' must be an Array or Function."

  getType: (value) ->
    return TU.Void if !value?
    value.constructor or null

  setType: require "set-type"

  isType: (value, type, compare) ->
    if TU.testType type, Array
      types = type
      return yes for type in types when TU.testType value, type, compare
      return no
    TU.testType value, type, compare

  assertType: (value, type, keyPath) ->
    return if TU.isType value, type
    global.failedAssertion = { value, type, keyPath }
    prefix =
      if keyPath? then "'#{keyPath}' must be"
      else "Expected"
    expected =
      if TU.isType type, Array then type.map((t) -> t.name).join ", "
      else expected = type.name
    throw TypeError prefix + " a #{expected}."

  validateTypes: (obj, specs, keyPath) ->

    return unless specs?
    TU.assertType specs, Object, keyPath

    for key, spec of specs
      value = obj[key]
      key = keyPath + "." + key if keyPath?

      # Support nested type specs.
      if TU.isType spec, Object
        continue unless value?
        TU.assertType value, Object, key
        TU.validateTypes value, spec, key

      # Throw an error if the value does not match its type spec.
      else _validateType value, spec, key

    return

  testType: (value, type, compare) ->
    compare ?= TU.compareTypes
    compare type, TU.getType value

  compareTypes:
    frozen: no
    value: (a, b) -> a is b
