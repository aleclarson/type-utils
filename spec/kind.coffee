
{ Kind
  isKind
  getKind
  setKind } = require "../src"

describe "getKind()", ->

  it "returns null when Object is passed", ->
    expect(getKind Object).toBe null

  it "returns Object when Function is passed", ->
    expect(getKind Function).toBe Object

  it "return Object when Array is passed", ->
    expect(getKind Array).toBe Object

describe "setKind()", ->

  it "sets the super-type of the given type", ->
    A = ->
    setKind A, Function
    expect(getKind A).toBe Function

  it "returns the first argument", ->
    A = ->
    expect(setKind A, Function).toBe A
