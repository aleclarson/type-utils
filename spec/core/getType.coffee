
getType = require "../../src/core/getType"

describe "getType()", ->

  it "returns the constructor of an instance", ->
    MyType = ->
    instance = new MyType
    expect(getType instance).toBe MyType

  it "returns Void for undefined", ->
    expect(getType undefined).toBe Void

  it "returns Null for null", ->
    expect(getType null).toBe Null

  it "returns Boolean for boolean literals", ->
    for value in [ yes, no ]
      expect(getType value).toBe Boolean
    return

  it "returns Number for numeric literals", ->
    for value in [ Infinity, -1, 0, 1, Math.PI ]
      expect(getType value).toBe Number
    return

  it "returns String for string literals", ->
    for value in [ "", "1", "a" ]
      expect(getType value).toBe String
    return

  it "returns Object for object literals", ->
    expect(getType {}).toBe Object

  it "returns Array for array literals", ->
    expect(getType []).toBe Array

  it "returns null for Object.create(null)", ->
    expect(getType Object.create null).toBe null

  it "returns Nan for number errors", ->
    expect(getType 1 - global).toBe Nan

  it "returns RegExp for regular expressions", ->
    expect(getType /.*/).toBe RegExp

  it "returns Object for Object.prototype", ->
    expect(getType Object.prototype).toBe Object

  it "returns Function for Function.prototype", ->
    expect(getType Function.prototype).toBe Function
