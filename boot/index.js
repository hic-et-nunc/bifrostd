const q = require('q');
const fs = require('fs');

module.exports = {
  run: function(confPaths, events) {
    var d = q.defer();

    let conf = {};
    conf.events = events;

    q.all(
      confPaths.map((path) => {
        return q.Promise((resolve, reject, notify) => {
          fs.readFile(path, (err, data) => {
            if (err) {
              return reject(err);
            }

            return resolve(data);
          });
        });
      })
    ).then((items) => {
      return items.map(JSON.parse).reduce((memo, item) => Object.assign({}, memo, item), conf);
    }).then(d.resolve)
    .fail(d.fail);

    return d.promise;
  },
};
