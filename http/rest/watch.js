const joi = require('joi');

module.exports = function(events) {
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

    events.emit("watch", payload);

    reply({}, 202);
  };
};
