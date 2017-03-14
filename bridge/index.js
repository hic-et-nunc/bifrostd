const q = require('q');
const fs = require('fs');
const path = require('path');

module.exports = function (upload, db) {
  const {writer, level} = require('./../log/stdout');

  return {
    upload: function(filename, next, commit, rollback) {
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

        return q.nfcall(upload, path.join(content.namespace, basename), fs.createReadStream(filename));
      }).then((result) => {
        writer(level.info, "Content " + filename + " correctly sent to the adapter");
        commit(next);
      }).fail((err) => {
        writer(level.error, err);
        writer(level.error, "Unable to write that content on the adapter");
        rollback(next);
      });
    },
  };
};
