const q = require('q');
const AWS = require('aws-sdk');

module.exports = function(app) {
  const {writer, level} = require('./../log/stdout');

  const adapter = require('./../bridge/s3')(new AWS.S3(app.aws.conf), app.aws.bucketName);

  const bridge = require('./../bridge')(adapter, app.db, app.events);

  app.queue.pop(bridge.upload);

  return q(app);
};


