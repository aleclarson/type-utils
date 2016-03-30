
inArray = require "in-array"

vowels = [ "a", "e", "i", "o", "u" ]

module.exports =

  invalidType: (type, key) ->
    type = formatType type
    hasVowel = inArray vowels, type[0].toLowerCase()
    reason = if key then "'#{key}' must be " else "Expected "
    reason += if hasVowel then "an " else "a "
    reason += type + "!"
    return TypeError reason

#
# Helpers
#

formatType = (types) ->
  return getTypeNames types if Array.isArray types
  return getTypeName types

getTypeNames = (types) ->

  typeNames = []

  types.forEach (type) ->
    typeNames.push getTypeName type

  typeCount = typeNames.length

  if typeCount is 1
    return typeNames[0]

  else if typeCount is 2
    return typeNames[0] + " or " + typeNames[1]

  lastType = typeNames.pop()
  return typeNames.join(", ") + ", or " + lastType

getTypeName = (type) ->

  if type is null
    return "null object"

  if type and type.name
    return type.name

  return "[unknown type]"
