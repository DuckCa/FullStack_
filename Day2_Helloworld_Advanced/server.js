const { createServer } = require("http"); // node.js
const hostname = "localhost"; //localhost
const port = 3003;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello DUCK 1");
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// npx kill-port 3002 , dung de xoa port de tranh conflict khi chay nhieu project cung luc
