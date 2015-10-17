
describe "getType(Any)", ->

  { getType, Void } = require "../src"

  it "returns the constructor of a defined value", ->
    for value in [100, "hi", yes, Object, {}, [], /[a-z]/g]
      expect(getType value).toBe value.constructor

  it "returns Void for null and undefined values", ->
    for value in [null, undefined]
      expect(getType value).toBe Void

describe "setType(Any, Type)", ->

  { setType } = require "../src"

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

describe "testType(Any, Type)", ->

  { testType } = require "../src"

  it "returns true if the given value is the given type", ->
    expect(testType yes, Boolean).toBe yes

  it "returns false if the given value isn't the given type", ->
    expect(testType no, String).toBe no

describe "validateTypes(Object.Kind, Object)", ->

  { validateTypes } = require "../src/index"

  it "throws a TypeError if the given object doesnt match the given spec", ->
    obj = { a: 1 }
    spec = { a: [ String ] }
    result = {}
    try validateTypes obj, spec
    catch error then result.error = error
    expect(result.error?).toBe yes

  it "does not throw a TypeError if the given object mathces the given spec", ->
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

describe "compareTypes(Type, Type)", ->

  { compareTypes } = require "../src"

  # it "takes "
