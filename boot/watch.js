const q = require('q');
const {writer, level} = require('./../log/stdout');
const {ObjectValues} = require('./../utils');

module.exports = function(app) {
  app.events.on('watch', writer(level.debug));

  let watch = require('../watch')(app.events);

  let watchers = {};

  app.events.on('watch.create', (path) => {
    if (watchers.hasOwnProperty(path)) {
      writer(level.warn, `Found duplicate watch on path: ${path}`);
      watchers[path].close();
    }

    watchers[path] = watch(path);
    writer(level.info, `Registered new watch on path: ${path}`);
  });

  app.events.on('watch.close', (path) => {
    if (watchers.hasOwnProperty(path)) {
      watchers[path].close();
      writer(level.info, `Close watch on path: ${path}`);
    }
  });

  app.events.on('shutdown', () => ObjectValues(watchers).map((w) => w.close()));

  return q(app);
};

