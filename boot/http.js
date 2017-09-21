const q = require('q');
const path = require('path');

module.exports = function(app) {
  const {writer, level} = require('./../log/stdout');
  const http = require('./../http')(app);

  app.events.on('shutdown', http.close);

  return q.Promise((resolve, reject, notify) => {

    http.listen({
      path: path.join(app.workdir, "bifrostd.sock"),
    }, () => {
      writer(level.info, "Listening...");
      return resolve(app);
    });
  });
};
