
{ throwFailure } = require "failure"

NamedFunction = require "named-function"
emptyFunction = require "emptyFunction"
inArray = require "in-array"
define = require "define"

module.exports = (TU) ->

  Void = NamedFunction "Void", -> # no-op

  Null = NamedFunction "Null", -> null

  Nan = NamedFunction "Nan", -> NaN

  Validator = NamedFunction "Validator", (name, constructor) ->
    type = NamedFunction name, ->
      validate = constructor.apply this, arguments
      TU.setType validate, type
    TU.setKind type, Validator
  TU.setKind Validator, Function

  AnyValidator = Validator "AnyValidator", ->
    NamedFunction "Any", -> # no-op

  Any = AnyValidator()

  Kind = Validator "Kind", (type) ->
    NamedFunction type.name + "_Kind", validateKind = (value, key) ->
      return if TU.isKind value, type
      name = if key? then "'#{key}'" else "This property"
      error = TypeError "#{name} must inherit from #{type.name}."
      throwFailure error, { key, value, type }

  OneOf = Validator "OneOf", (possibleValues) ->
    return validateOneOf = (value, key) ->
      return if inArray possibleValues, value
      name = if key? then "'#{key}'" else "This property"
      error = TypeError "#{name} has an invalid value."
      throwFailure error, { key, value, possibleValues }

  Shape = Validator "Shape", (shape) ->
    TU.assertType shape, Object
    return validateShape = (value, key) ->
      TU.assertType value, Object, key
      TU.validateTypes value, shape, key

  ArrayOf = Validator "ArrayOf", (types) ->
    return validateArray = (array, key = "array") ->
      TU.assertType array, Array, key
      for index, value of array
        try TU.assertType value, types, key + "[" + index + "]"
        catch error then throwFailure error, { index, array }
      return

#
# Exports
#

  { Any
    Void
    Null
    Nan
    Kind
    OneOf
    Shape
    ArrayOf
    Validator }
