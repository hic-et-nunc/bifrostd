var level = require('./level');
var writer = require('./')(require('./log')(process.stdout))
  (require('./format'))
  (require('./filter')(level.value.debug));

module.exports = {writer, level};
