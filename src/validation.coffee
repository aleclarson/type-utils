
reportFailure = require "report-failure"

{ getTypeNames } = require "./helpers"

module.exports = (TU) ->

  validatorTypes = []

  addValidatorType = (config) ->
    TU.assertKind config.isType, Function
    TU.assertKind config.validate, Function
    validatorTypes.unshift config

  addValidatorType
    isType: (type) -> TU.isType type, Array
    validate: validateWithArray = (value, types, key) ->
      return if types.length is 0
      return TU.assertType value, types[0], key if types.length is 1
      return if TU.isType value, types
      key = if key? then "'#{key}'" else "This property"
      typeNames = getTypeNames types
      error = TypeError "#{key} must be a #{typeNames}"
      reportFailure error, { key, value, types }

  addValidatorType
    isType: (type) -> TU.isKind type, Function
    validate: validateWithFunction = (value, type, key) ->
      type value, key

  addValidatorType
    isType: (type) -> TU.isType type, Object
    validate: validateWithObject = (value, type, key) ->
      return unless value?
      TU.assertKind value, Object, key
      validateTypes value, type, key

  validateType = (value, type, key) ->
    for { isType, validate } in validatorTypes
      return validate value, type, key if isType type
    error = TypeError "Invalid validator type!"
    reportFailure error, { key, value, type }

  validateTypes = (obj, types, keyPath) ->
    TU.assertKind obj, Object, keyPath
    TU.assertType types, Object
    for key, type of types
      value = obj[key]
      key = keyPath + "." + key if keyPath?
      try validateType value, type, key
      catch error
        error.obj = obj
        error.types = types
        throw error
    return

  return {
    validateTypes
    addValidatorType
  }
