
validateTypes = require "../../src/core/validateTypes"

describe "validateTypes()", ->

  it "throws a TypeError if the given object doesnt match its spec", ->
    obj = a: 1
    spec = a: String
    expect -> validateTypes obj, spec
      .toThrow()

  it "doesnt throw a TypeError if the given object matches its spec", ->
    obj = a: 1
    spec = a: Number
    expect -> validateTypes obj, spec
      .not.toThrow()

  it "supports multiple properties", ->
    obj = a: 1, b: 2
    spec = a: Number, b: String
    expect -> validateTypes obj, spec
      .toThrow()

  it "doesnt support nested specs", ->
    obj = { a: { b: 1 } }
    spec = { a: { b: [ String ] } }
    result = {}
    expect -> validateTypes obj, spec
    try validateTypes obj, spec
    catch error then result.error = error
    expect(result.error?).toBe yes
