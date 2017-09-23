const q = require('q');
const fs = require('fs');
const path = require('path');

module.exports = function (upload, db, events) {
  return {
    upload: function(filename, next, commit, rollback) {
      let configuration = null;
      let basename = path.basename(filename);

      db.get(filename).then((content) => {
        if (content) {
          return content;
        }

        return db.get(path.dirname(filename));
      }).then((content) => {
        if (!content) {
          return q.reject(null);
        }

        configuration = content;

        return q.nfcall(upload, path.join(content.namespace, basename), fs.createReadStream(filename));
      }).then((result) => {
        events.emit("bridge.sent", {filename: filename, configuration: configuration});
        commit(next);
      }).fail((err) => {
        events.emit("bridge.fail", err);
        rollback(next);
      });
    },
  };
};
