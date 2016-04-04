var Kind;

Kind = require("../../src/types/Kind");

describe("Kind", function() {
  return it("checks if the value inherits from the given type", function() {
    var kind, result;
    kind = Kind(Object);
    result = kind.validate([]);
    expect(result).toBe(true);
    result = kind.validate(1);
    return expect(result).not.toBe(true);
  });
});

//# sourceMappingURL=../../../map/spec/types/Kind.map
