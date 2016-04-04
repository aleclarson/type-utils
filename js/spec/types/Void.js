var Void;

Void = require("../../src/types/Void");

describe("Void", function() {
  return it("checks if a value is undefined", function() {
    var result;
    result = Void.validate(void 0);
    expect(result).toBe(true);
    result = Void.validate(null);
    return expect(result).not.toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/types/Void.map
