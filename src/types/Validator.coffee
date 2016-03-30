
NamedFunction = require "named-function"
WeakMap = require "weak-map"

setKind = require "../core/setKind"
setType = require "../core/setType"

module.exports =
Validator = NamedFunction "Validator", (name, validator) ->
  type = Validator.Type name, -> validator
  return type()

setKind Validator, Function

Validator.Type = NamedFunction "ValidatorType", (name, constructor) ->
  type = NamedFunction name, ->
    validator = constructor.apply null, arguments
    validator.name = name
    setType validator, type
  setKind type, Validator
  type[Validator.type] = yes
  return type

Validator.type = Symbol "Validator"
