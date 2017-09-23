const path = require('path');
const mock = require('mock-fs');
const boot = require('./../../boot');
const EventEmitter = require('events');


describe("Boot", () => {
  beforeEach(() => {
    mock({
      '/path/to': {
        'conf.json': '{"test": true}',
        'conf2.json': '{"test": false, "ok": true}'
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("single conf file", (done) => {
    boot
      .run(["/path/to/conf.json"], new EventEmitter())
      .then((conf) => {
        expect(conf.test).toBe(true);
        done();
      })
      .fail((err) => {
        fail(err);
        done();
      });
  });

  it("multiple conf file", (done) => {
    boot
      .run(["/path/to/conf.json", "/path/to/conf2.json"], new EventEmitter())
      .then((conf) => {
        expect(conf.test).toBe(false);
        expect(conf.ok).toBe(true);
        done();
      })
      .fail((err) => {
        fail(err);
        done();
      });
  });
});
