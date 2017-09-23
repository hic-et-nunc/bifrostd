const http = require('http');
const rest = require('./rest');

module.exports = function(app) {
  let watch = require('./rest/watch')(app.events);
  let path = require('./rest/path')(app.db, app.events);

  var server = http.createServer(rest([
    ["post", /^\/watch$/i, watch],
    ["get", /^\/path$/i, path.list],
    ["delete", /^\/path\/(.*)/i, path.delete],
    ["get", /^\/path\/(.*)/i, path.get],
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
