
describe "getKind(Type)", ->
  { getKind } = require "../src"

  it "returns the super-type of the given type", ->
    expect(getKind Function).toBe Object

  it "returns null when Object is passed", ->
    expect(getKind Object).toBe null

describe "setKind()", ->
  { getKind, setKind } = require "../src"

  it "sets the super-type of the given type", ->
    A = ->
    B = ->
    setKind A, B
    expect(getKind A).toBe B

  it "returns the given type", ->
    A = ->
    B = ->
    expect(setKind A, B).toBe A

describe "testKind", ->
  { testKind } = require "../src"

describe "getKinds", ->
  { getKinds } = require "../src"

describe "Kind", ->
  { Kind } = require "../src"
