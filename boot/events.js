const q = require('q');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {
  app.events.on('error', writer(level.error));

  app.events.on('shutdown', writer(level.warn));
  app.events.on('watch.change', writer(level.debug));
  app.events.on('watch.remove', writer(level.debug));

  app.events.on('watch.create', writer(level.debug));
  app.events.on('watch.close', writer(level.debug));

  app.events.on('bridge.sent', writer(level.info));
  app.events.on('bridge.fail', writer(level.error));

  return q(app);
};

