const q = require('q');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {
  app.events.on('watch', writer(level.debug));

  let watch = require('../watch')(app.events);

  let watchers = [];

  app.events.on('watch.create', (path) => {
    watchers = watchers.concat([watch(path)]);
  });

  app.events.on('shutdown', () => watchers.map((w) => w.close()));

  return q(app);
};

