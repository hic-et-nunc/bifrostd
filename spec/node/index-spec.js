var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var node = require('../../node');

describe("node", () => {

  describe("watch", () => {
    var fixtures = path.join(__dirname, ".tmp");

    beforeEach((done) => {
      mkdirp(fixtures, done);
    });

    afterEach((done) => {
      rimraf(fixtures, done);
    });

    it("watches for changes", (done) => {
      node("personal")(fixtures, (e) => {
        expect(e.filename).toEqual(path.join(fixtures, "test.txt"));
        expect(e.namespace).toEqual("personal");
        done();
      });

      fs.writeFileSync(path.join(fixtures, "test.txt"), "");
    });
  });
});
