
NamedFunction = require "NamedFunction"
setKind = require "setKind"
setType = require "setType"

module.exports =
Validator = NamedFunction "Validator", (name, validator) ->
  type = Validator.Type name, -> validator
  return type()

define = Object.defineProperty

# Override `Function::name`!
define Validator.prototype, "name",
  configurable: no
  enumerable: yes
  get: -> @getName()

Validator.Type = NamedFunction "ValidatorType", (name, constructor) ->
  type = NamedFunction name, ->
    validator = constructor.apply null, arguments
    setType validator, type
  setKind type, Validator
  type[Validator.type] = yes
  type::getName = -> name
  return type

Validator.type = Symbol "Validator"
