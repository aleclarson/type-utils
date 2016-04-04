
inArray = require "in-array"

formatType = require "./core/formatType"

vowels = [ "a", "e", "i", "o", "u" ]

module.exports =

  invalidType: (type, key) ->
    type = formatType type
    hasVowel = inArray vowels, type[0].toLowerCase()
    reason = if key then "'#{key}' must be " else "Expected "
    reason += if hasVowel then "an " else "a "
    reason += type + "!"
    return TypeError reason
