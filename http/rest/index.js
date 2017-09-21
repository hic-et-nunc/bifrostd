const url = require('url');

module.exports = function(routes) {
  return function(req, res) {

    var urlInfo = url.parse(req.url, true);

    var route = routes
      .filter((item) => item[0].toLowerCase() == req.method.toLowerCase())
      .filter((item) => item[1].test(urlInfo.pathname))
      .slice(-1)[0]
    ;

    if (route) {

      var body = {
        query: urlInfo.query,
        payload: [],
        params: route[1]
          .exec(urlInfo.pathname).slice(1).slice(-3)
          .map((item) => decodeURI(item)),
      };

      return req
        .on('data', (chunk) => body.payload.push(chunk))
        .on('end', () =>{
          body.payload = Buffer.concat(body.payload).toString();

          return route[2](body, function(body, statusCode = 200, headers = {}) {
            headers = Object.assign({},{"Content-Type": "application/json"}, headers);

            res.writeHead(statusCode, headers);
            res.end(JSON.stringify(body));
          });
        });
    }

    res.writeHead(404, {"Content-Type": "application/json"});
    res.end();
  };
};


