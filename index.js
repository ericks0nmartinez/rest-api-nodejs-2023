const express = require("express");

const server = express();

server.use(express.json());
server.listen(3000);
console.log("App init");
server.get("/", (req, res) => {
  return res.send({ name: "App init", version: "1.0.0" });
});
