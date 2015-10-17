
NamedFunction = require "named-function"
emptyFunction = require "emptyFunction"
inArray = require "in-array"
define = require "define"

module.exports = ->

  OneOf: NamedFunction "OneOf", (possibleValues) ->
    (value) -> inArray possibleValues, value

  Void: NamedFunction "Void", emptyFunction
