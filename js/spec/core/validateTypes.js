var validateTypes;

validateTypes = require("../../src/core/validateTypes");

describe("validateTypes()", function() {
  it("throws a TypeError if the given object doesnt match its spec", function() {
    var obj, spec;
    obj = {
      a: 1
    };
    spec = {
      a: String
    };
    return expect(function() {
      return validateTypes(obj, spec);
    }).toThrow();
  });
  it("doesnt throw a TypeError if the given object matches its spec", function() {
    var obj, spec;
    obj = {
      a: 1
    };
    spec = {
      a: Number
    };
    return expect(function() {
      return validateTypes(obj, spec);
    }).not.toThrow();
  });
  it("supports multiple properties", function() {
    var obj, spec;
    obj = {
      a: 1,
      b: 2
    };
    spec = {
      a: Number,
      b: String
    };
    return expect(function() {
      return validateTypes(obj, spec);
    }).toThrow();
  });
  return it("doesnt support nested specs", function() {
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
    expect(function() {
      return validateTypes(obj, spec);
    });
    try {
      validateTypes(obj, spec);
    } catch (error1) {
      error = error1;
      result.error = error;
    }
    return expect(result.error != null).toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/core/validateTypes.map
