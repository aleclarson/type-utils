var getKind;

getKind = require("../../src/core/getKind");

describe("getKind()", function() {
  it("throws an error when an invalid value is passed", function() {
    return expect(function() {
      return getKind(null);
    }).toThrowError("Expected a constructor type!");
  });
  it("returns null when Object is passed", function() {
    var kind;
    kind = getKind(Object);
    return expect(kind).toBe(null);
  });
  it("returns Object when Function is passed", function() {
    var kind;
    kind = getKind(Function);
    return expect(kind).toBe(Object);
  });
  return it("return Object when Array is passed", function() {
    var kind;
    kind = getKind(Array);
    return expect(kind).toBe(Object);
  });
});

//# sourceMappingURL=../../../map/spec/core/getKind.map
