
getKind = require "../../src/core/getKind"

describe "getKind()", ->

  it "throws an error when an invalid value is passed", ->
    expect -> getKind null
      .toThrowError "Expected a constructor type!"

  it "returns null when Object is passed", ->
    kind = getKind Object
    expect kind
      .toBe null

  it "returns Object when Function is passed", ->
    kind = getKind Function
    expect kind
      .toBe Object

  it "return Object when Array is passed", ->
    kind = getKind Array
    expect kind
      .toBe Object
