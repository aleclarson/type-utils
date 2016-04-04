
Maybe = require "../../src/types/Maybe"

describe "Maybe", ->

  it "checks if the value is a valid type", ->

    type = Maybe Number

    result = type.validate 1

    expect result
      .toBe yes

  it "allows undefined values", ->

    type = Maybe Number

    result = type.validate undefined

    expect result
      .toBe yes

  it "works with multiple types", ->

    type = Maybe [ Number, String ]

    result = type.validate 1

    expect result
      .toBe yes

    result = type.validate "foo"

    expect result
      .toBe yes

    result = type.validate NaN

    expect result
      .not.toBe yes
