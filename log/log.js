/* jshint node: true */
'use strict';

module.exports = function(stream) {
  return function log(message) {
    if (!message) {
      return null;
    }

    stream.write(JSON.stringify(message) + "\n");
    return message;
  };
};

