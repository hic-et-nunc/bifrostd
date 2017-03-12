
module.exports = function(message) {
  return Object.assign({}, {date: (new Date()).toISOString()}, {msg: message});
};
