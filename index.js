const path = require('path');
const program = require('commander');
const EventEmitter = require('events');

const events = new EventEmitter();

program
  .version('0.0.1')
  .option('-c, --conf <value>', 'Configuration file', (item, memo) => memo.concat([item]), [])
  .parse(process.argv);

require('./boot')
  .run(program.conf, events)
  .then(require('./boot/events'))
  .then(require('./boot/watch'))
  .then(require('./boot/store'))
  .then(require('./boot/queue'))
  .then(require('./boot/bridge'))
  .then(require('./boot/notify'))
  .then(require('./boot/http'))
  .then(require('./boot/end'))
  .fail((err) => process.exit(1))
;

process.on("SIGINT", function() {
  events.emit('shutdown', 'shutdown');
});

