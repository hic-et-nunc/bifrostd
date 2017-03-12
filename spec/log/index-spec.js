var streams = require('memory-streams');

describe("Log", () => {
  describe("all", () => {
    let stream = null;
    let level = require('../../log/level');
    let writer = null;

    beforeEach(() => {
      stream = new streams.WritableStream();

      writer = require('../../log')(require('../../log/log')(stream))
        (require('../../log/format'))
        (require('../../log/filter')(level.value.info));
    });

    it("should write a json message", () => {
      writer(level.info)("hello");
      expect(stream.toString()).toMatch(/hello/);
    });

    it("should write a json message 2", () => {
      writer(level.info, "hello");
      expect(stream.toString()).toMatch(/hello/);
    });

    it("should not write debug info", () => {
      writer(level.debug)("hello");
      expect(stream.toString()).toEqual("");
    });

    it("should write errors", () => {
      writer(level.error)("hello");
      expect(stream.toString()).toMatch(/hello/i);
    });
  });
});

