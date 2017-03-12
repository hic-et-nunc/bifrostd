const path = require('path');
const EventEmitter = require('events');

const events = new EventEmitter();

require('./boot')
  .run([path.join(__dirname, './conf.json')], events)
  .then(require('./boot/events'))
  .then(require('./boot/store'))
  .then(require('./boot/watch'))
  .then(require('./boot/http'))
  .then(require('./boot/end'));

process.on("SIGINT", function() {
  events.emit('shutdown', 'shutdown');
});

