
getKind = require "./getKind"

module.exports = (type) ->
  types = []
  loop
    types.push type
    type = getKind type
    break unless type?
  return types
