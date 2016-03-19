
exports.getTypeNames = (types) ->
  unless types instanceof Array
    return types.name
  typeNames = types.map (type) -> type?.name
  switch typeNames.length
    when 1 then typeNames[0]
    when 2 then "#{typeNames[0]} or #{typeNames[1]}"
    else
      lastType = typeNames.pop()
      typeNames.join(", ") + ", or #{lastType}"
