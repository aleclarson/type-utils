
setType = require "./setType"

module.exports = (type, kind) ->
  prototype = type and type.prototype
  setType prototype, kind
  return type
