var Shape;

Shape = require("../../src/types/Shape");

describe("Shape", function() {
  it("needs a name", function() {
    var type;
    expect(function() {
      return Shape({
        a: Number
      });
    }).toThrowError("Expected a String!");
    type = null;
    expect(function() {
      return type = Shape("Foo", {
        a: Number
      });
    }).not.toThrow();
    return expect(type.name).toBe("Foo");
  });
  return it("works with assertType()", function() {
    var Position, assertType;
    Position = Shape("Position", {
      x: Number,
      y: Number
    });
    assertType = require("../../src/core/assertType");
    expect(function() {
      return assertType({
        x: 0,
        y: 0
      }, Position);
    }).not.toThrow();
    return expect(function() {
      return assertType({
        x: 0,
        y: null
      }, Position);
    }).toThrowError("'y' must be a Number!");
  });
});

//# sourceMappingURL=../../../map/spec/types/Shape.map
