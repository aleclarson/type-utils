
require "lotus-require"

inits = [
  require "./type"
  require "./kind"
  require "./assertion"
  require "./validation"
  require "./types"
]

define = require "define"
define exports, ->
  @options = frozen: yes
  @ init exports for init in inits
  return

exports.any = (values) ->
  return value for value in values when value?
  return
