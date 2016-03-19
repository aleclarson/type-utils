var Kind, getKind, isKind, ref, setKind;

ref = require("../src"), Kind = ref.Kind, isKind = ref.isKind, getKind = ref.getKind, setKind = ref.setKind;

describe("getKind()", function() {
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

describe("setKind()", function() {
  it("sets the super-type of the given type", function() {
    var A;
    A = function() {};
    setKind(A, Function);
    return expect(getKind(A)).toBe(Function);
  });
  return it("returns the first argument", function() {
    var A;
    A = function() {};
    return expect(setKind(A, Function)).toBe(A);
  });
});

//# sourceMappingURL=../../map/spec/kind.map
