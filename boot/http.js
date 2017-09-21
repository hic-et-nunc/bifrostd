const q = require('q');
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  const {writer, level} = require('./../log/stdout');
  const http = require('./../http')(app);

  app.events.on('shutdown', http.close);

  return q.Promise((resolve, reject, notify) => {

    let sock = path.join(app.workdir, "bifrostd.sock");

    http.listen({
      path: sock,
    }, () => {
      fs.chmod(sock, 504, () => {
        writer(level.info, "Listening...");
        return resolve(app);
      });
    });
  });
};
