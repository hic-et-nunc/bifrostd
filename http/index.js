const http = require('http');
const rest = require('./rest');

module.exports = function(app) {
  var server = http.createServer(rest([
    ["post", /^\/watch$/i, require('./rest/watch')(app.events)],
  ]));

  return {
    listen: function(app, cb) {
      server.listen(app, cb);
    },
    close: function() {
      server.close();
    },
  };
};
