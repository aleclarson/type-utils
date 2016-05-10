
inArray = require "in-array"

valueTypes = [ Number, String, Boolean ]

getKind = require "./getKind"

module.exports = (type, kind) ->
  loop
    return yes if type is kind
    break if type is Object
    return no if inArray valueTypes, type
    type = getKind type
    break if type is null
  return no
