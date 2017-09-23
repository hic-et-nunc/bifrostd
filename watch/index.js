var fs = require('fs');
var path = require('path');

module.exports = function(events) {
  return function(basepath) {
    return fs.watch(basepath, {recursive: false}, (eventType, filename) => {
      fs.stat(basepath, (err, stat) => {
        let fullpath = basepath;

        if (err) {
          return events.emit('watch.remove', fullpath);
        }

        if (stat.isDirectory()) {
          fullpath = path.join(basepath, filename);
        }

        events.emit('watch.change', fullpath);
      });
    });
  };
};

