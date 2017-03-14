const q = require('q');

module.exports = function(app) {
  const {writer, level} = require('./../log/stdout');

  return q.Promise((resolve, reject, notify) => {
    require('queue-file')(app.queuedir, (err, queue) => {
      if (err) {
        writer(level.fatal, `Unable to start the queue at path ${app.queuedir}`);
        return reject(err);
      }

      app.events.on('watch.change', (fullpath) => {
        queue.push(fullpath, (err, filename) => {
          writer(level.debug, `Queue file recorded at path ${filename}`);
          writer(level.info, `File ${fullpath} sent to queue...`);
        });
      });

      app.events.on('shutdown', queue.close);

      app.queue = queue;

      return resolve(app);
    });
  });
};

