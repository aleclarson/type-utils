
Null = require "../../src/types/Null"

describe "Null", ->

  it "checks if a value is null", ->

    result = Null.validate null

    expect result
      .toBe yes

    result = Null.validate undefined

    expect result
      .not.toBe yes
