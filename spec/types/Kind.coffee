
Kind = require "../../src/types/Kind"

describe "Kind", ->

  it "checks if the value inherits from the given type", ->

    kind = Kind Object

    result = kind.validate []

    expect result
      .toBe yes

    result = kind.validate 1

    expect result
      .not.toBe yes
