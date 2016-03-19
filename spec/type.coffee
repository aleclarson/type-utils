
{ Void
  Null
  Nan
  getType
  setType
  testType
  validateTypes } = require "../src"

describe "getType()", ->

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

describe "setType()", ->

  it "sets the constructor and __proto__ of an Object.Kind", ->
    obj = {}
    result = setType obj, Function
    expect(obj).toBe result
    expect(obj.__proto__).toBe Function.prototype
    expect(obj.constructor).toBe Function

  it "does nothing if the first value is null or undefined", ->
    try
      setType null, Function
      setType undefined, Function
    catch error
    expect(error?).toBe no

describe "testType()", ->

  it "returns true if the given value is the given type", ->
    expect(testType yes, Boolean).toBe yes

  it "returns false if the given value isn't the given type", ->
    expect(testType no, String).toBe no

describe "validateTypes()", ->

  it "throws a TypeError if the given object doesnt match the given spec", ->
    obj = { a: 1 }
    spec = { a: [ String ] }
    result = {}
    try validateTypes obj, spec
    catch error then result.error = error
    expect(result.error?).toBe yes

  it "does not throw a TypeError if the given object matches the given spec", ->
    obj = { a: 1 }
    spec = { a: [ Number ] }
    result = {}
    try validateTypes obj, spec
    catch error then result.error = error
    expect(result.error?).toBe no

  it "supports nested specs", ->
    obj = { a: { b: 1 } }
    spec = { a: { b: [ String ] } }
    result = {}
    try validateTypes obj, spec
    catch error then result.error = error
    expect(result.error?).toBe yes
