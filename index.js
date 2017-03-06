
const http = require('./http')(require('./conf.json'));

http.listen({
  path: "/tmp/bifrostd.sock",
}, () => {
  process.stdout.write("Listening...\n");
});

process.on("SIGINT", function() {
  process.stdout.write("Close signal received...\n");
  http.close();
});
