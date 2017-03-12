var streams = require('memory-streams');

describe("Log", () => {
  describe("write", () => {
    let log = require('../../log/log');

    it("should write a json message", () => {
      let stream = new streams.WritableStream();
      logger = log(stream);
      logger("hello");

      expect(stream.toString()).toEqual('"hello"\n');
    });
  });
});
