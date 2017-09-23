const q  = require('q');

module.exports = function(db, events) {
  return {
    list: function(body, reply) {
      db.read()
        .then((items) => {
          reply(Object.keys(items), 200);
        });
    },
    get: function(body, reply) {
      let path = body.params[0];
      db.get(body.params[0]).then((data) => {
        if (!data) {
          return reply(null, 404);
        }

        reply(data);
      });
    },
    delete: function(body, reply) {
      let path = body.params[0];
      db.get(body.params[0]).then((data) => {
        if (!data) {
          return reply(null, 404);
        }

        return db.del(path);
      }).then((data) => {
        events.emit("watch.close", path);
        reply(data);
      });
    },
  };
};

