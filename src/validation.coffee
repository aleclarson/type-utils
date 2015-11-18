
{ getTypeNames } = require "./helpers"

module.exports = (TU) ->

  validatorTypeCache = []

  validateType = (value, validator, keyPath) ->
    for { type, validate } in validatorTypeCache
      if TU.isType validator, type
        return validate value, validator, keyPath
    global.failure ?= { key: keyPath, value, validator }
    throw TypeError "'validator' has an unexpected type."

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
    global.failure ?= { key: keyPath, value, types }
    keyPath = if keyPath? then "'#{keyPath}'" else "This property"
    typeNames = getTypeNames types
    throw TypeError "#{keyPath} must be a #{typeNames}"

  addValidatorType Function, validateWithFunction
  addValidatorType Array, validateWithArray

  return {
    validateTypes
    addValidatorType
  }
