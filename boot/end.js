const q = require('q');
const {writer, level} = require('./../log/stdout');

module.exports = function(app) {
  writer(level.info, "Application is ready");
  return q(app);
};
