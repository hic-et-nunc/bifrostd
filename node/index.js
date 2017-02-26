var fs = require('fs');
var path = require('path');

module.exports = function(namespace) {
  return function(basepath, callback) {
    return fs.watch(basepath, {recursive: false}, (eventType, filename) => {
      if (fs.existsSync(path.join(basepath, filename))) {
        callback({namespace: namespace, filename: path.join(basepath, filename)});
      }
    });
  };
};

