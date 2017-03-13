
module.exports = function(s3, bucketName) {
  return function(key, data, callback) {
      s3.putObject({
        Bucket: bucketName,
        Key: key,
        Data: data,
      }, callback);
  };
};
