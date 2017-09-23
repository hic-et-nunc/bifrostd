const q = require('q');
const fs = require('fs');

module.exports = {
  run: function(confPaths, events) {
    var d = q.defer();

    let conf = {};
    conf.events = events;

    q
      .all( confPaths.map((path) => q.nfcall(fs.readFile, path)))
      .then(
        (items) => items
          .map(JSON.parse)
          .reduce((memo, item) => Object.assign({}, memo, item), conf)
      )
      .then(d.resolve)
      .fail(d.fail);

    return d.promise;
  },
};
