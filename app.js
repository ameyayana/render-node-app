const http = require("http");

const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.MESSAGE || "Hello from Render Node App ";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>${MESSAGE}</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
