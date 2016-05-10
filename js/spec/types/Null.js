var Null;

Null = require("../../src/types/Null");

describe("Null", function() {
  return it("checks if a value is null", function() {
    var result;
    result = Null.validate(null);
    expect(result).toBe(true);
    result = Null.validate(void 0);
    return expect(result).not.toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/types/Null.map
