var setType;

setType = require("../../src/core/setType");

describe("setType()", function() {
  it("sets the constructor and __proto__ of an Object.Kind", function() {
    var obj, result;
    obj = {};
    result = setType(obj, Function);
    expect(obj).toBe(result);
    expect(obj.__proto__).toBe(Function.prototype);
    return expect(obj.constructor).toBe(Function);
  });
  return it("throws an error if the first value is null or undefined", function() {
    expect(function() {
      return setType(null, Function);
    }).toThrowError("Object.setPrototypeOf called on null or undefined");
    return expect(function() {
      return setType(void 0, Function);
    }).toThrowError("Object.setPrototypeOf called on null or undefined");
  });
});

//# sourceMappingURL=../../../map/spec/core/setType.map
