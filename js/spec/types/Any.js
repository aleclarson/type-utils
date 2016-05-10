var Any;

Any = require("../../src/types/Any");

describe("Any", function() {
  return it("allows any value to be used", function() {
    var i, len, result, results, value, values;
    values = [void 0, null, 1, true, "foo", [], {}, Any];
    results = [];
    for (i = 0, len = values.length; i < len; i++) {
      value = values[i];
      result = Any.validate(value);
      results.push(expect(result).toBe(true));
    }
    return results;
  });
});

//# sourceMappingURL=../../../map/spec/types/Any.map
