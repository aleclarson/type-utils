
setKind = require "../../src/core/setKind"

describe "setKind()", ->

  it "sets the super-type of the given type", ->

    MyType = ->
    setKind MyType, Function

    expect MyType.prototype.__proto__
      .toBe Function.prototype

  it "returns the first argument", ->

    MyType = ->

    result = setKind MyType, Function

    expect result
      .toBe MyType
