const joi = require('joi');
const node = require('../../node');
const copy = require('../../copy');

module.exports = function(conf) {
  var schema = joi.object().keys({
    namespace: joi.string().min(1).required(),
    path: joi.string().min(1).required(),
  }).with('namespace', 'path');

  return function(body, reply) {
    var payload = JSON.parse(body.payload);

    var result = joi.validate(payload, schema);
    if (result.error !== null) {
      return reply({errors: result.error.details}, 406);
    }

    conf.watches.push(node(payload.namespace)(payload.path, copy(conf.workdir)));

    reply({}, 202);
  };
};
