const express = require("express");
const router = express.Router();
const products = require("./products.handller")

router.post("/", async (req, res) => {
    const product = req.body;
    res.json(await products.cadastrarProducts(product));
    
});

router.get("/", async (req, res) => {
    res.json(await products.buscarProducts());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await products.buscarProducts(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await products.deletarProducts(id));
});
module.exports = router;