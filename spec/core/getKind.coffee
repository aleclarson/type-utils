
getKind = require "../../src/core/getKind"

describe "getKind()", ->

  it "throws an error when an invalid value is passed", ->
    expect -> getKind null
      .toThrowError "Expected a constructor type!"

  it "returns the constructor of prototype.__proto__", ->

    Foo = ->

    Bar = ->

    Object.setPrototypeOf Bar.prototype, Foo.prototype

    kind = getKind Bar

    expect kind
      .toBe Foo

  it "returns null for prototypes with an undefined __proto__", ->

    Foo = ->

    Object.setPrototypeOf Foo.prototype, null

    expect getKind Foo
      .toBe null

  it "returns null when Object is passed", ->
    expect getKind Object
      .toBe null

  it "returns Object when Function is passed", ->
    expect getKind Function
      .toBe Object

  it "return Object when Array is passed", ->
    expect getKind Array
      .toBe Object
