
setType = require "set-type"

{ getTypeNames } = require "./helpers"
initValidation = require "./validation"

module.exports = (TU) ->

  { validateTypes, addValidatorType } = initValidation TU

  getType = (value) ->
    unless value?
      TU.Void
    else if Number.isNaN value
      throw Error "NaN indicates a number error."
    else
      value.constructor or null

  isType = (value, type, compare) ->
    if TU.testType type, Array
      types = type
      return yes for type in types when TU.testType value, type, compare
      return no
    TU.testType value, type, compare

  testType = (value, type, compare) ->
    return type value if type instanceof TU.Validator
    compare ?= TU.compareTypes
    compare type, TU.getType value

  compareTypes =
    frozen: no
    value: (a, b) -> a is b

  assertType = (value, type, keyPath) ->
    try passed = TU.isType value, type
    return if passed is yes
    global.failure ?= { key: keyPath, value, type }
    if keyPath? then prefix = "'#{keyPath}' must be"
    else prefix = "Expected"
    throw TypeError "#{prefix} a #{getTypeNames type}."

  { getType
    setType
    isType
    testType
    compareTypes
    assertType
    validateTypes
    addValidatorType }
