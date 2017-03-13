const fs = require('fs');
const path = require('path');

module.exports = function (upload, db) {
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

          q.nfcall(upload, path.join(content.namespace, basename), fs.readFileSync(filename));
        }).then((result) => {
          commit(next);
        }).fail(() => {
          rollback(next);
        });
    },
  };
};
