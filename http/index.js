const http = require('http');
const rest = require('./rest');

module.exports = function(conf) {
  conf.watches = [];

  var server = http.createServer(rest([
    ["post", /^\/watch$/i, require('./rest/watch')(conf)],
    ["get", /^\/namespace$/i, require('./rest/namespace')(conf)],
  ]));

  return {
    listen: function(conf, cb) {
      server.listen(conf, cb);
    },
    close: function() {
      conf.watches.map((watch) => watch.close());
      server.close();
    },
  };
};
