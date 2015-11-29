
setType = require "set-type"

{ getTypeNames } = require "./helpers"
initValidation = require "./validation"

module.exports = (TU) ->

  { validateTypes, addValidatorType } = initValidation TU

  isNan = (value, ctr) ->
    return no if (ctr is Object) or (ctr is String) or (value instanceof Object)
    return isNaN value

  getType = (value) ->
    return TU.Void unless value?
    ctr = value.constructor
    return null unless ctr?
    return TU.Nan if isNan value, ctr
    return ctr

  isType = (value, type, compare) ->
    if TU.testType type, Array
      types = type
      return yes for type in types when TU.testType value, type, compare
      return no
    TU.testType value, type, compare

  testType = (value, type, compare) ->
    if type instanceof TU.Validator
      try type value
      catch error
        global.failure = null
        return no
      yes
    else
      compare ?= TU.compareTypes
      compare type, TU.getType value

  compareTypes =
    frozen: no
    value: (a, b) -> a is b

  assertType = (value, type, keyPath) ->
    return type value if type instanceof TU.Validator
    try passed = TU.isType value, type
    return if passed is yes
    global.failure ?= { key: keyPath, value, type }
    throw TypeError(
      if keyPath? then "'#{keyPath}' must be a #{getTypeNames type}."
      else "Expected a #{getTypeNames type}."
    )

  assertReturnType = (value, type, keyPath) ->
    try passed = TU.isType value, type
    return if passed is yes
    global.failure ?= { key: keyPath, value, type }
    throw TypeError(
      if keyPath? then "'#{keyPath}' must return a #{getTypeNames type}."
      else "Expected a #{getTypeNames type} to be returned."
    )

  { getType
    setType
    isType
    testType
    compareTypes
    assertType
    assertReturnType
    validateTypes
    addValidatorType }
