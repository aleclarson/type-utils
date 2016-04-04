var Maybe;

Maybe = require("../../src/types/Maybe");

describe("Maybe", function() {
  it("checks if the value is a valid type", function() {
    var result, type;
    type = Maybe(Number);
    result = type.validate(1);
    return expect(result).toBe(true);
  });
  it("allows undefined values", function() {
    var result, type;
    type = Maybe(Number);
    result = type.validate(void 0);
    return expect(result).toBe(true);
  });
  return it("works with multiple types", function() {
    var result, type;
    type = Maybe([Number, String]);
    result = type.validate(1);
    expect(result).toBe(true);
    result = type.validate("foo");
    expect(result).toBe(true);
    result = type.validate(NaN);
    return expect(result).not.toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/types/Maybe.map
