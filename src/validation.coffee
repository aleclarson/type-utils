
reportFailure = require "report-failure"

{ getTypeNames } = require "./helpers"

module.exports = (TU) ->

  validatorTypeCache = []

  validateType = (value, validator, keyPath) ->
    for config in configs
      if config.isType validator
        return config.validate value, validator, keyPath
    error = TypeError "'validator' has an unexpected type."
    reportFailure error, { key: keyPath, value, validator }

  validateTypes = (obj, validators, keyPath) ->
    return unless validators?
    TU.assertType validators, Object, keyPath
    for key, validator of validators
      value = obj[key]
      key = keyPath + "." + key if keyPath?
      if TU.isType validator, Object
        continue unless value?
        TU.assertKind value, Object, key
        validateTypes value, validator, key
      else
        validateType value, validator, key
    return

  addValidatorType = (type, validate) ->
    validatorTypeCache.push { type, validate }

  validateWithFunction = (value, validator, keyPath) ->
    validator value, keyPath

  validateWithArray = (value, types, keyPath) ->
    return if types.length is 0
    return TU.assertType value, types[0], keyPath if types.length is 1
    return if TU.isType value, types
    keyPath = if keyPath? then "'#{keyPath}'" else "This property"
    typeNames = getTypeNames types
    error = TypeError "#{keyPath} must be a #{typeNames}"
    reportFailure error, { key: keyPath, value, types }

  addValidatorType Function, validateWithFunction
  addValidatorType Array, validateWithArray

  return {
    validateTypes
    addValidatorType
  }
