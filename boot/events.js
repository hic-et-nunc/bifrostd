const q = require('q');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {
  app.events.on('watch', writer(level.debug));
  app.events.on('shutdown', writer(level.warn));

  return q(app);
};

