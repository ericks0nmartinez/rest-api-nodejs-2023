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

const products = [];

server.post("/products", (req, res) => {
  const { name, price } = req.body;
  products.push({ name, price });
  return res.send({ msg: "success" });
});

server.get("/products", (req, res) => {
  return res.send({ data: products });
});

server.put("/product", (req, res) => {
  const { oldName, name, price } = req.body;
  const index = products.findIndex((item) => item.name === oldName);
  products[index].name = name;
  products[index].price = price;
  return res.send({ msg: "success" });
});
