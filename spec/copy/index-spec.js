var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');

var copy = require('../../copy');

describe("copy", () => {

  describe("writedown", () => {
    var fixtures = path.join(__dirname, ".tmp");

    beforeEach(() => {
      mock({
        "/var/lib/bifrostd": {},
        "/home/walter/keys/test.txt": "Test file",
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it("copy changed file to queue disk", (done) => {
      copy("/var/lib/bifrostd")({
        namespace: "personal",
        filename: "/home/walter/keys/test.txt",
      }).then((body) => {
        expect(/rev/i.test(body)).toBe(true);
        expect(fs.existsSync("/var/lib/bifrostd/personal/home/walter/keys/test.txt")).toBe(true);
        done();
      }).fail((err) => {
        fail(err);
        done();
      });
    });
  });
});

