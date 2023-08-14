const express = require("express");

const server = express();

server.use(express.json());
server.listen(3000);
console.log("App init");
server.get("/", (req, res) => {
  return res.send({ name: "App init", version: "1.0.0" });
});

server.get("/query-params", (req, res) => {
  const { name, lang } = req.query;
  return res.send({
    result: lang === "pt" ? `Seja bem vindo ${name}` : `Welcome ${name}`,
  });
});
