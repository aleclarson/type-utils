describe("getKind(Type)", function() {
  var getKind;
  getKind = require("../src").getKind;
  it("returns the super-type of the given type", function() {
    return expect(getKind(Function)).toBe(Object);
  });
  return it("returns null when Object is passed", function() {
    return expect(getKind(Object)).toBe(null);
  });
});

describe("setKind()", function() {
  var getKind, ref, setKind;
  ref = require("../src"), getKind = ref.getKind, setKind = ref.setKind;
  it("sets the super-type of the given type", function() {
    var A, B;
    A = function() {};
    B = function() {};
    setKind(A, B);
    return expect(getKind(A)).toBe(B);
  });
  return it("returns the given type", function() {
    var A, B;
    A = function() {};
    B = function() {};
    return expect(setKind(A, B)).toBe(A);
  });
});

describe("testKind", function() {
  var ref, testKind;
  return ref = require("../src"), testKind = ref.testKind, ref;
});

describe("getKinds", function() {
  var getKinds, ref;
  return ref = require("../src"), getKinds = ref.getKinds, ref;
});

describe("Kind", function() {
  var Kind, ref;
  return ref = require("../src"), Kind = ref.Kind, ref;
});

//# sourceMappingURL=../../map/spec/kind.map
