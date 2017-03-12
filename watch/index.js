var fs = require('fs');
var path = require('path');

module.exports = function(events) {
  return function(basepath) {
    return fs.watch(basepath, {recursive: false}, (eventType, filename) => {
      let fullpath = path.join(basepath, filename);

      if (fs.existsSync(fullpath)) {
        events.emit('watch.change', fullpath);
      } else {
        events.emit('watch.remove', fullpath);
      }
    });
  };
};

