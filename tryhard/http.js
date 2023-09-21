const http = require("node:http");

const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", 'text/plain; charset="utf-8');

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Hello World\n");
  } else if (req.url === "/contacto") {
    res.statusCode = 200;
    res.end("<button>ASDdo</button>");
  } else {
    res.statusCode = 404;
    res.end("Not Found\n");
  }
};
const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server is listening on port http://localhost:${desiredPort}`);
});
