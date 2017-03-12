
module.exports = function(level) {
  return function(message) {
    if (message.level >= level) {
      return message;
    }

    return null;
  };
};
