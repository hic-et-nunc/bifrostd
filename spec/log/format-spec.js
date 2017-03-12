let f = require('../../log/format');

describe("Format", () => {
  it ("should serialize to json", () => {
    expect(f("ciao").msg).toEqual("ciao");
  });
});
