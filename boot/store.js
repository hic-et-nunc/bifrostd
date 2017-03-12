const q = require('q');
const {writer, level} = require('./../log/stdout');
const info = writer(level.info);
const warn = writer(level.warn);
const error = writer(level.error);

module.exports = function(app) {
  const watch = require('../watch')(app.events);
  const db = require('../store')(app.datadir);

  db.read().then((data) => {
    Object.keys(data).map((key) => {
      app.events.emit('watch.create', key);
    });
  });

  app.events.on('watch.remove', (path) => {
    db.del(path).then(warn);
  });

  app.events.on('watch', (event) => {
    db.get(event.path)
      .then((data) => {
        if (data) {
          return q.reject({error: "watch already in place...", data: data});
        }

        return db.write(event.path, event);
      })
      .then((data) => {
        app.events.emit('watch.create', event.path);
        return data;
      })
      .then(info)
      .fail(error);
  });

  return q(app);
};


