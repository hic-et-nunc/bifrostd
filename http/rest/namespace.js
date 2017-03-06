const joi = require('joi');
const ls = require('ls-stat');

module.exports = function(conf) {
  return function(body, reply) {
    ls(conf.workdir).then((items) => {
      reply(
        items.filter((item) => item.isDirectory()).map((item) => item.filename),
        200
      );
    });
  };
};

