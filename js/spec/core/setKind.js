var setKind;

setKind = require("../../src/core/setKind");

describe("setKind()", function() {
  it("sets the super-type of the given type", function() {
    var MyType;
    MyType = function() {};
    setKind(MyType, Function);
    return expect(MyType.prototype.__proto__).toBe(Function.prototype);
  });
  return it("returns the first argument", function() {
    var MyType, result;
    MyType = function() {};
    result = setKind(MyType, Function);
    return expect(result).toBe(MyType);
  });
});

//# sourceMappingURL=../../../map/spec/core/setKind.map
