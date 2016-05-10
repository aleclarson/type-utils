
Shape = require "../../src/types/Shape"

describe "Shape", ->

  it "needs a name", ->

    expect -> Shape { a: Number }
      .toThrowError "Expected a String!"

    type = null
    expect -> type = Shape "Foo", { a: Number }
      .not.toThrow()

    expect type.name
      .toBe "Foo"

  it "works with assertType()", ->

    Position = Shape "Position", { x: Number, y: Number }

    assertType = require "../../src/core/assertType"

    expect -> assertType { x: 0, y: 0 }, Position
      .not.toThrow()

    expect -> assertType { x: 0, y: null }, Position
      .toThrowError "'y' must be a Number!"
