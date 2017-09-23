
exports.ObjectValues = function(obj) {
  return Object.keys(obj).map((k) => obj[k]);
};
