const q = require('q');
const toiletdb = require('toiletdb');

module.exports = function(path) {
  let db = toiletdb(path);

  return {
    read: function() {
      let d = q.defer();

      db.read((err, data) => {
        if (err) {
          return d.reject(err);
        }

        if (!data) {
          data = [];
        }

        return d.resolve(data);
      });

      return d.promise;
    },
    get: function(key) {
      let d = q.defer();

      db.read((err, data) => {
        if (err) {
          return d.reject(err);
        }

        if (!data) {
          data = null;
        }

        return d.resolve(data[key]);
      });

      return d.promise;
    },
    write: function(path, data) {
      let d = q.defer();

      db.write(path, data, (err) => {
        if (err) {
          return d.reject(err);
        }

        return d.resolve(data);
      });

      return d.promise;
    },
    del: function(path) {
      let d = q.defer();

      db.delete(path, (err) => {
        if (err) {
          return d.reject(err);
        }

        return d.resolve(path);
      });

      return d.promise;
    },
  };
};

