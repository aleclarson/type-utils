
require "lotus-require"
define = require "define"

definitions = [
  require "./type"
  require "./kind"
  require "./types"
]

define module.exports, ->
  @options = frozen: yes
  for getDefinition in definitions
    @ getDefinition module.exports

exports.any = (values) ->
  return value for value in values when value?
  return
