
Void = require "../../src/types/Void"

describe "Void", ->

  it "checks if a value is undefined", ->

    result = Void.validate undefined

    expect result
      .toBe yes

    result = Void.validate null

    expect result
      .not.toBe yes
