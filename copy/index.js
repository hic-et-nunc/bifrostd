var q = require('q');
var fs = require('fs');
var path = require('path');
var attr = require('file-attributes');
var mkdirp = require('mkdirp');
var uuid = require('uuid/v4');

module.exports = function(workdir) {
  return function(evt) {
    var {set} = attr(path.join(workdir, evt.namespace));
    return q.nfcall(set, evt.filename, JSON.stringify({rev: uuid()}));
  };
};
