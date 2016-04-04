var ArrayOf;

ArrayOf = require("../../src/types/ArrayOf");

describe("ArrayOf", function() {
  it("validates every value in the array", function() {
    var result, type;
    type = ArrayOf(Number);
    result = type.validate([1, 2, 3]);
    expect(result).toBe(true);
    result = type.validate([1, 2, null]);
    return expect(result).not.toBe(true);
  });
  it("works with multiple types", function() {
    var result, type;
    type = ArrayOf([Number, String]);
    result = type.validate([1, "foo", 2]);
    expect(result).toBe(true);
    result = type.validate([1, "foo", null]);
    return expect(result).not.toBe(true);
  });
  return it("works with empty arrays", function() {
    var result, type;
    type = ArrayOf(Number);
    result = type.validate([]);
    return expect(result).toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/types/ArrayOf.map
