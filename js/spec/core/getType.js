var getType;

getType = require("../../src/core/getType");

describe("getType()", function() {
  it("returns the constructor of an instance", function() {
    var MyType, instance;
    MyType = function() {};
    instance = new MyType;
    return expect(getType(instance)).toBe(MyType);
  });
  it("returns Void for undefined", function() {
    return expect(getType(void 0)).toBe(Void);
  });
  it("returns Null for null", function() {
    return expect(getType(null)).toBe(Null);
  });
  it("returns Boolean for boolean literals", function() {
    var i, len, ref, value;
    ref = [true, false];
    for (i = 0, len = ref.length; i < len; i++) {
      value = ref[i];
      expect(getType(value)).toBe(Boolean);
    }
  });
  it("returns Number for numeric literals", function() {
    var i, len, ref, value;
    ref = [Infinity, -1, 0, 1, Math.PI];
    for (i = 0, len = ref.length; i < len; i++) {
      value = ref[i];
      expect(getType(value)).toBe(Number);
    }
  });
  it("returns String for string literals", function() {
    var i, len, ref, value;
    ref = ["", "1", "a"];
    for (i = 0, len = ref.length; i < len; i++) {
      value = ref[i];
      expect(getType(value)).toBe(String);
    }
  });
  it("returns Object for object literals", function() {
    return expect(getType({})).toBe(Object);
  });
  it("returns Array for array literals", function() {
    return expect(getType([])).toBe(Array);
  });
  it("returns null for Object.create(null)", function() {
    return expect(getType(Object.create(null))).toBe(null);
  });
  it("returns Nan for number errors", function() {
    return expect(getType(1 - global)).toBe(Nan);
  });
  it("returns RegExp for regular expressions", function() {
    return expect(getType(/.*/)).toBe(RegExp);
  });
  it("returns Object for Object.prototype", function() {
    return expect(getType(Object.prototype)).toBe(Object);
  });
  return it("returns Function for Function.prototype", function() {
    return expect(getType(Function.prototype)).toBe(Function);
  });
});

//# sourceMappingURL=../../../map/spec/core/getType.map
