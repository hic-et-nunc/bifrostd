let level = require('../../log/level');

describe("Level", () => {
  it ("should append the level", () => {
    expect(level.info({"msg": "ciao"})).toEqual({msg: "ciao", lvl: "info", level: level.value.info});
  });

  it ("should append the debug level", () => {
    expect(level.debug({"msg": "ciao"})).toEqual({msg: "ciao", lvl: "debug", level: level.value.debug});
  });
});

