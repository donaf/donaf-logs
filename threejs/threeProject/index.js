/*
 * @Author: qf
 * @Date: 2022-03-21 17:31:45
 * @LastEditTime: 2022-03-21 17:46:06
 * @LastEditors: qf
 * @Description:
 */
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello, World!`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
