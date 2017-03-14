
module.exports = function(s3, bucketName) {
  return function(key, stream, callback) {
      s3.putObject({
        Bucket: bucketName,
        Key: key,
        Body: stream,
      }, callback);
  };
};
