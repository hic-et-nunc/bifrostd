
const conf = require('./conf.json');
const http = require('./http')(conf);

http.listen({
  path: "/tmp/bifrostd.sock",
}, () => {
  process.stdout.write("Listening...\n");
});

process.on("SIGINT", function() {
  process.stdout.write("Close signal received...\n");
  http.close();
});
