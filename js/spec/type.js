var Nan, Null, Void, getType, ref, setType, testType, validateTypes;

ref = require("../src"), Void = ref.Void, Null = ref.Null, Nan = ref.Nan, getType = ref.getType, setType = ref.setType, testType = ref.testType, validateTypes = ref.validateTypes;

describe("getType()", function() {
  it("returns Void for undefined", function() {
    return expect(getType(void 0)).toBe(Void);
  });
  it("returns Null for null", function() {
    return expect(getType(null)).toBe(Null);
  });
  it("returns Boolean for boolean literals", function() {
    var i, len, ref1, value;
    ref1 = [true, false];
    for (i = 0, len = ref1.length; i < len; i++) {
      value = ref1[i];
      expect(getType(value)).toBe(Boolean);
    }
  });
  it("returns Number for numeric literals", function() {
    var i, len, ref1, value;
    ref1 = [Infinity, -1, 0, 1, Math.PI];
    for (i = 0, len = ref1.length; i < len; i++) {
      value = ref1[i];
      expect(getType(value)).toBe(Number);
    }
  });
  it("returns String for string literals", function() {
    var i, len, ref1, value;
    ref1 = ["", "1", "a"];
    for (i = 0, len = ref1.length; i < len; i++) {
      value = ref1[i];
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

describe("setType()", function() {
  it("sets the constructor and __proto__ of an Object.Kind", function() {
    var obj, result;
    obj = {};
    result = setType(obj, Function);
    expect(obj).toBe(result);
    expect(obj.__proto__).toBe(Function.prototype);
    return expect(obj.constructor).toBe(Function);
  });
  return it("does nothing if the first value is null or undefined", function() {
    var error;
    try {
      setType(null, Function);
      setType(void 0, Function);
    } catch (_error) {
      error = _error;
    }
    return expect(error != null).toBe(false);
  });
});

describe("testType()", function() {
  it("returns true if the given value is the given type", function() {
    return expect(testType(true, Boolean)).toBe(true);
  });
  return it("returns false if the given value isn't the given type", function() {
    return expect(testType(false, String)).toBe(false);
  });
});

describe("validateTypes()", function() {
  it("throws a TypeError if the given object doesnt match the given spec", function() {
    var error, obj, result, spec;
    obj = {
      a: 1
    };
    spec = {
      a: [String]
    };
    result = {};
    try {
      validateTypes(obj, spec);
    } catch (_error) {
      error = _error;
      result.error = error;
    }
    return expect(result.error != null).toBe(true);
  });
  it("does not throw a TypeError if the given object matches the given spec", function() {
    var error, obj, result, spec;
    obj = {
      a: 1
    };
    spec = {
      a: [Number]
    };
    result = {};
    try {
      validateTypes(obj, spec);
    } catch (_error) {
      error = _error;
      result.error = error;
    }
    return expect(result.error != null).toBe(false);
  });
  return it("supports nested specs", function() {
    var error, obj, result, spec;
    obj = {
      a: {
        b: 1
      }
    };
    spec = {
      a: {
        b: [String]
      }
    };
    result = {};
    try {
      validateTypes(obj, spec);
    } catch (_error) {
      error = _error;
      result.error = error;
    }
    return expect(result.error != null).toBe(true);
  });
});

//# sourceMappingURL=../../map/spec/type.map
