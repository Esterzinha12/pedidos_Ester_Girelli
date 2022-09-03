const express = require("express");
const router = express.Router();
const orderProducts = require("./orderProducts.handller")

router.post("/", async (req, res) => {
    const ordersProducts = req.body;
    res.json(await orderProducts.cadastrarOrderProducts(ordersProducts));
});

router.get("/", async (req, res) => {
    res.json(await orderProducts.buscarOrderProducts());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await orderProducts.buscarOrderProducts(id));
});

router.delete("/:id", async (req, res) => {
    const idOrderProducts = req.params.id;
    const orderProducts = req.body;
    res.json(await orderProducts.deletarOrderProducts(idOrderProducts, orderProducts));
});
module.exports = router;