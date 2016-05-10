
Any = require "../../src/types/Any"

describe "Any", ->

  it "allows any value to be used", ->

    values = [
      undefined
      null
      1
      yes
      "foo"
      []
      {}
      Any
    ]

    for value in values
      result = Any.validate value
      expect result
        .toBe yes
