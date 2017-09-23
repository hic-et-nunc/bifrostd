const q = require('q');
const notify = require('../notify');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {

  app.events.on("bridge.sent", notify('sent'));
  app.events.on("bridge.fail", notify('fail'));

  writer(level.info, "Notification system ready...");
  return q(app);
};

