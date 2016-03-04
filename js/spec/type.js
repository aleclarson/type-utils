describe("getType(Any)", function() {
  var Void, getType, ref;
  ref = require("../src"), getType = ref.getType, Void = ref.Void;
  it("returns the constructor of a defined value", function() {
    var i, len, ref1, results, value;
    ref1 = [100, "hi", true, Object, {}, [], /[a-z]/g];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      value = ref1[i];
      results.push(expect(getType(value)).toBe(value.constructor));
    }
    return results;
  });
  return it("returns Void for null and undefined values", function() {
    var i, len, ref1, results, value;
    ref1 = [null, void 0];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      value = ref1[i];
      results.push(expect(getType(value)).toBe(Void));
    }
    return results;
  });
});

describe("setType(Any, Type)", function() {
  var setType;
  setType = require("../src").setType;
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

describe("testType(Any, Type)", function() {
  var testType;
  testType = require("../src").testType;
  it("returns true if the given value is the given type", function() {
    return expect(testType(true, Boolean)).toBe(true);
  });
  return it("returns false if the given value isn't the given type", function() {
    return expect(testType(false, String)).toBe(false);
  });
});

describe("validateTypes(Object.Kind, Object)", function() {
  var validateTypes;
  validateTypes = require("../src/index").validateTypes;
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
  it("does not throw a TypeError if the given object mathces the given spec", function() {
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

describe("compareTypes(Type, Type)", function() {
  var compareTypes, ref;
  return ref = require("../src"), compareTypes = ref.compareTypes, ref;
});

//# sourceMappingURL=../../map/spec/type.map
