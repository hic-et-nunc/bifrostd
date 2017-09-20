const q = require('q');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {
  app.events.on('error', writer(level.error));

  app.events.on('shutdown', writer(level.warn));
  app.events.on('watch.change', writer(level.debug));
  app.events.on('watch.remove', writer(level.debug));

  app.events.on('watch.create', writer(level.debug));
  app.events.on('watch.delete', writer(level.debug));

  return q(app);
};

