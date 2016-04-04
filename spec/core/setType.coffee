
setType = require "../../src/core/setType"

describe "setType()", ->

  it "sets the constructor and __proto__ of an Object.Kind", ->

    obj = {}

    result = setType obj, Function

    expect obj
      .toBe result

    expect obj.__proto__
      .toBe Function.prototype

    expect obj.constructor
      .toBe Function

  it "throws an error if the first value is null or undefined", ->

    expect -> setType null, Function
      .toThrowError "Object.setPrototypeOf called on null or undefined"

    expect -> setType undefined, Function
      .toThrowError "Object.setPrototypeOf called on null or undefined"
