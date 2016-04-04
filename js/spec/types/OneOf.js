var OneOf;

OneOf = require("../../src/types/OneOf");

describe("OneOf", function() {
  it("needs a name", function() {
    var type;
    expect(function() {
      return OneOf([0]);
    }).toThrow();
    type = null;
    expect(function() {
      return type = OneOf("Foo", [0]);
    }).not.toThrow();
    return expect(type.name).toBe("Foo");
  });
  return it("works with assertType()", function() {
    var Binary, assertType;
    Binary = OneOf("Binary", [0, 1]);
    assertType = require("../../src/core/assertType");
    expect(function() {
      return assertType(0, Binary);
    }).not.toThrow();
    return expect(function() {
      return assertType(2, Binary);
    }).toThrowError("Unexpected value!");
  });
});

//# sourceMappingURL=../../../map/spec/types/OneOf.map
