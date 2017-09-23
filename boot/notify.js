const q = require('q');
const notify = require('../notify');
const {writer, level} = require('./../log/stdout');
const {SENT, FAIL} = require('./../notify/status');

module.exports = function(app) {

  app.events.on("bridge.sent", notify(SENT));
  app.events.on("bridge.fail", notify(FAIL));

  writer(level.info, "Notification system ready...");
  return q(app);
};

