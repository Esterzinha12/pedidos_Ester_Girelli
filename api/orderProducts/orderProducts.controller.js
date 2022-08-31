const express = require("express");
const router = express.Router();
const orderProducts = require("./orderProducts.handller")

router.post("/", async (req, res) => {
    console.log("ok");
    const ordersProducts = req.body;
    console.log("ok");
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
    const id = req.params.id;
    res.json(await orderProducts.deletarOrderProducts(id));
});
module.exports = router;