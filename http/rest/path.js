module.exports = function(db) {
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
  };
};

