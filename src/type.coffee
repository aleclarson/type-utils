
global.Symbol ?= {}

checkNanSafely = (value, ctr) ->
  return no if not isNaN value
  return no if value instanceof Object
  return no if value is ctr.prototype
  return no if ctr is String
  return no if ctr is Symbol
  return yes

module.exports = (TU) ->

  getType: (value) ->
    return TU.Void if value is undefined
    return TU.Null if value is null
    ctr = value.constructor
    return null unless ctr
    return TU.Nan if checkNanSafely value, ctr
    return ctr

  setType: require "set-type"

  isType: (value, type, compare) ->

    if TU.testType type, Array
      types = type
      return yes for type in types when TU.testType value, type, compare
      return no

    if (type is null) or TU.isKind type, Function
      return TU.testType value, type, compare

    throw TypeError "Must pass at least one type (or null) to 'isType'!"

  testType: (value, type, compare) ->
    if TU.isKind type, TU.Validator
      try type value
      catch error
        error.catch?()
        return no
      yes
    else
      compare ?= TU.compareTypes
      compare type, TU.getType value

  compareTypes:
    frozen: no
    value: (a, b) -> a is b
