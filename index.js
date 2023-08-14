const api = require("./api");

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
    result:
      lang === "pt"
        ? `Seja bem vindo ${name === undefined ? "" : name}`
        : `Welcome ${name === undefined ? "" : name}`,
  });
});

let products = []; // simular um banco de dados

// POST = INSERT
server.post("/products", (req, res) => {
  const { id, name, price } = req.body;
  products.push({ id, name, price });
  return res.send({ msg: "success" });
});

// GET = SELECT
server.get("/products", (req, res) => {
  return res.send({ products: products });
});

//PUT = UPDATE
server.put("/product", (req, res) => {
  const { oldName, name, price } = req.body;
  const index = products.findIndex((item) => item.name === oldName);
  products[index].name = name;
  products[index].price = price;
  return res.send({ msg: "success" });
});

//DELETE
server.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  const newProducts = products.filter((item) => item.id !== parseInt(id));
  products = newProducts;
  return res.send({ products: products });
});

server.get("/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params; // obtem o ID para enviar para o end point do pokemon
    const { data } = await api.get(`pokemon/${id}`);
    return res.send({ name: data.name });
  } catch (error) {
    res.status(404); // mudança de status quando houver um erro
    return res.send({
      message: error.message,
      name: error.name,
      status: error.status,
      code: error.code,
    });
  }
});
