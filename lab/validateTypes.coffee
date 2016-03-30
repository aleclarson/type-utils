
{ validateTypes, Shape } = require "type-utils"

obj = {}
obj.a = {}

types = Shape
  b: Number
  c: [ Number, Void ]

validateTypes obj, types
