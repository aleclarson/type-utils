
module.exports = (type) ->
  return getTypeNames type if Array.isArray type
  return getTypeName type

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

  if type

    if type.name
      return type.name

    if type.getName
      return type.getName()

  console.log require('util').format type
  return "[unknown type]"
