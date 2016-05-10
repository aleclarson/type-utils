
ArrayOf = require "../../src/types/ArrayOf"

describe "ArrayOf", ->

  it "validates every value in the array", ->

    type = ArrayOf Number

    result = type.validate [ 1, 2, 3 ]

    expect result
      .toBe yes

    result = type.validate [ 1, 2, null ]

    expect result
      .not.toBe yes

  it "works with multiple types", ->

    type = ArrayOf [ Number, String ]

    result = type.validate [ 1, "foo", 2 ]

    expect result
      .toBe yes

    result = type.validate [ 1, "foo", null ]

    expect result
      .not.toBe yes

  it "works with empty arrays", ->

    type = ArrayOf Number

    result = type.validate []

    expect result
      .toBe yes
