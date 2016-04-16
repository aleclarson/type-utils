var getKind;

getKind = require("../../src/core/getKind");

describe("getKind()", function() {
  it("throws an error when an invalid value is passed", function() {
    return expect(function() {
      return getKind(null);
    }).toThrowError("Expected a constructor type!");
  });
  it("returns the constructor of prototype.__proto__", function() {
    var Bar, Foo, kind;
    Foo = function() {};
    Bar = function() {};
    Object.setPrototypeOf(Bar.prototype, Foo.prototype);
    kind = getKind(Bar);
    return expect(kind).toBe(Foo);
  });
  it("returns null for prototypes with an undefined __proto__", function() {
    var Foo;
    Foo = function() {};
    Object.setPrototypeOf(Foo.prototype, null);
    return expect(getKind(Foo)).toBe(null);
  });
  it("returns null when Object is passed", function() {
    return expect(getKind(Object)).toBe(null);
  });
  it("returns Object when Function is passed", function() {
    return expect(getKind(Function)).toBe(Object);
  });
  return it("return Object when Array is passed", function() {
    return expect(getKind(Array)).toBe(Object);
  });
});

//# sourceMappingURL=../../../map/spec/core/getKind.map
