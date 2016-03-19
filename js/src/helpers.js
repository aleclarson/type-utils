exports.getTypeNames = function(types) {
  var lastType, typeNames;
  if (!(types instanceof Array)) {
    return types.name;
  }
  typeNames = types.map(function(type) {
    return type != null ? type.name : void 0;
  });
  switch (typeNames.length) {
    case 1:
      return typeNames[0];
    case 2:
      return typeNames[0] + " or " + typeNames[1];
    default:
      lastType = typeNames.pop();
      return typeNames.join(", ") + (", or " + lastType);
  }
};

//# sourceMappingURL=../../map/src/helpers.map
