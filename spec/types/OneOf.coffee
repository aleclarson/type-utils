
OneOf = require "../../src/types/OneOf"

describe "OneOf", ->

  it "needs a name", ->

    expect -> OneOf [ 0 ]
      .toThrow()

    type = null
    expect -> type = OneOf "Foo", [ 0 ]
      .not.toThrow()

    expect type.name
      .toBe "Foo"

  it "works with assertType()", ->

    Binary = OneOf "Binary", [ 0, 1 ]

    assertType = require "../../src/core/assertType"

    expect -> assertType 0, Binary
      .not.toThrow()

    expect -> assertType 2, Binary
      .toThrowError "Unexpected value!"
