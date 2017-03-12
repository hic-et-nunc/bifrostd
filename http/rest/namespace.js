const joi = require('joi');
const ls = require('ls-stat');

module.exports = function(workdir) {
  return function(body, reply) {
    ls(workdir).then((items) => {
      reply(
        items.filter((item) => item.isDirectory()).map((item) => item.filename),
        200
      );
    });
  };
};

