
NamedFunction = require "named-function"
emptyFunction = require "emptyFunction"
inArray = require "in-array"
define = require "define"

module.exports = (TU) ->

  Void = NamedFunction "Void", emptyFunction

  Validator = NamedFunction "Validator", (name, constructor) ->
    type = NamedFunction name, ->
      validate = constructor.apply this, arguments
      TU.setType validate, type
    TU.setKind type, Validator
  TU.setKind Validator, Function

  Kind = Validator "Kind", (type) ->
    NamedFunction type.name + "_Kind", validateKind = (value, key) ->
      return if TU.testKind TU.getType(value), type
      global.failure ?= { key, value, type }
      key = if key? then "'#{key}'" else "This property"
      throw TypeError "#{key} must inherit from #{type.name}."

  OneOf = Validator "OneOf", (possibleValues) ->
    return validateOneOf = (value, key) ->
      return if inArray possibleValues, value
      global.failure ?= { key, value, possibleValues }
      key = if key? then "'#{key}'" else "This property"
      throw TypeError "#{key} has an invalid value."

  Shape = Validator "Shape", (shape) ->
    shapeKeys = Shape.gatherKeys shape
    return validateShape = (value, key) ->
      return unless value?
      TU.assertType value, Object, key
      keyPath = []
      keyPath.push key if key?
      for key in Object.keys value
        continue if inArray shapeKeys, key
        global.failure ?= { key, value, possibleKeys: shapeKeys }
        keyPath.push key
        key = keyPath.join "."
        throw TypeError "'#{key}' is not a valid key."
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
    Kind
    OneOf
    Shape
    Validator }
