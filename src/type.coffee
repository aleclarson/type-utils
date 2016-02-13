
reportFailure = require "report-failure"

module.exports = (TU) ->

  isNan = (value, ctr) ->
    return no if (ctr is Object) or (ctr is String) or (ctr is Symbol) or (TU.isKind value, Object)
    return isNaN value

  getType: (value) ->
    return TU.Void unless value?
    ctr = value.constructor
    return null unless ctr?
    return TU.Nan if isNan value, ctr
    return ctr

  setType: require "set-type"

  isType: (value, type, compare) ->

    if TU.testType type, Array
      types = type
      return yes for type in types when TU.testType value, type, compare
      return no
    TU.testType value, type, compare

  testType: (value, type, compare) ->
    if TU.isKind type, TU.Validator
      try type value
      catch error
        error.catch()
        return no
      yes
    else
      compare ?= TU.compareTypes
      compare type, TU.getType value

  compareTypes:
    frozen: no
    value: (a, b) -> a is b
