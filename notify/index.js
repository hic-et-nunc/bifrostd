const path = require('path');
const notifier = require('node-notifier');
const {SENT, FAIL} = require('./status');

module.exports = function(status) {
  return function(event) {
    if (event.configuration.notify) {
      notifier.notify({
        'title': (status == SENT) ? `${event.configuration.namespace}`: `FAIL: ${event.configuration.namespace}`,
        'message': `${event.filename}`,
        'icon': path.join(__dirname, './icon.png'),
      });
    }
  };
};
