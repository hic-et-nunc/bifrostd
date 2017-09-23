const q = require('q');
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  const {writer, level} = require('./../log/stdout');
  const http = require('./../http')(app);

  app.events.on('shutdown', http.close);

  return q.Promise((resolve, reject, notify) => {
    http.listen(app.httpd, () => {
      // just nothing
      let initHttpd = (obj, cb) => cb(`Listening on ${obj.host}:${obj.port}`);

      // on UNIX socket limit access to user/group
      if (app.httpd.hasOwnProperty("path")) {
        initHttpd = (obj, cb) => fs.chmod(obj.path, 504, () => cb(`Listening at path: ${app.httpd.path}`));
      }

      initHttpd(app.httpd, (listening) => {
        writer(level.info, listening);
        return resolve(app);
      });
    });
  });
};
