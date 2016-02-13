
NamedFunction = require "named-function"
reportFailure = require "report-failure"
emptyFunction = require "emptyFunction"
inArray = require "in-array"
define = require "define"

module.exports = (TU) ->

  Void = NamedFunction "Void", emptyFunction

  Nan = NamedFunction "Nan", emptyFunction.thatReturns NaN

  Validator = NamedFunction "Validator", (name, constructor) ->
    type = NamedFunction name, ->
      validate = constructor.apply this, arguments
      TU.setType validate, type
    TU.setKind type, Validator
  TU.setKind Validator, Function

  AnyValidator = Validator "AnyValidator", ->
    NamedFunction "Any", emptyFunction

  Any = AnyValidator()

  Kind = Validator "Kind", (type) ->
    NamedFunction type.name + "_Kind", validateKind = (value, key) ->
      return if TU.isKind value, type
      name = if key? then "'#{key}'" else "This property"
      error = TypeError "#{name} must inherit from #{type.name}."
      reportFailure error, { key, value, type }

  OneOf = Validator "OneOf", (possibleValues) ->
    return validateOneOf = (value, key) ->
      return if inArray possibleValues, value
      name = if key? then "'#{key}'" else "This property"
      error = TypeError "#{name} has an invalid value."
      reportFailure error, { key, value, possibleValues }

  Shape = Validator "Shape", (shape) ->
    shapeKeys = Shape.gatherKeys shape
    return validateShape = (value, key) ->
      return unless value?
      TU.assertType value, Object, key
      keyPath = []
      keyPath.push key if key?
      for key in Object.keys value
        continue if inArray shapeKeys, key
        keyPath.push key
        key = keyPath.join "."
        error = TypeError "'#{key}' is not a valid key."
        reportFailure error, { key, value, possibleKeys: shapeKeys }
      return

  Shape.gatherKeys = (obj) ->
    if TU.isType obj, Array
      array = obj
      keys = []
      for obj in array
        keys = keys.concat Shape.gatherKeys obj
      keys
    else if TU.isKind obj, Object
      keys = Object.keys obj
    else
      throw TypeError "Expected an Object or Array."

#
# Exports
#

  { Void
    Nan
    Any
    Kind
    OneOf
    Shape
    Validator }
