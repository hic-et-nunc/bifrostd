const mock = require('mock-fs');
const store = require('../../store');

describe("Store", () => {

  describe("write", () => {
    let db = null;

    beforeEach(() => {
      mock({
        "/tmp": {}
      });

      db = store("/tmp/db.json");
    });

    afterEach(() => {
      mock.restore();
    });

    it("should save", (done) => {
      db.write("/test/ok", {test: "OK"}).then((data) => {
        expect(data).toEqual({test: "OK"});
        done();
      });
    });

    it("should save multiple keys", (done) => {
      db.write("/test/ok", {test: "OK"})
        .then((data) => {
          return db.write("/test/ok", {test: "OK2"});
        })
        .then((data) => {
          expect(data).toEqual({test: "OK2"});
          done();
        });
    });
  });

  describe("read", () => {
    let db = null;

    beforeEach(() => {
      mock({
        "/tmp/full.json": '{"/test": [{"eg": true}]}',
      });

      db = store("/tmp/full.json");
    });

    afterEach(() => {
      mock.restore();
    });

    it("should read", (done) => {
      db.get("/test").then((data) => {
        expect(data).toEqual([{eg: true}]);
        done();
      });
    });

    it("should read missing keys", (done) => {
      db.get("/test-missing").then((data) => {
        expect(data).toBe(undefined);
        done();
      });
    });
  });

  describe("delete", () => {
    let db = null;

    beforeEach(() => {
      mock({
        "/tmp/full.json": '{"/test": [{"eg": true}]}',
      });

      db = store("/tmp/full.json");
    });

    afterEach(() => {
      mock.restore();
    });

    it("should delete", (done) => {
      db.del("/test").then((data) => {
        expect(data).toEqual("/test");
        done();
      });
    });
  });
});
