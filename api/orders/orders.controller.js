const express = require("express");
const router = express.Router();
const orders = require("./orders.handller");

router.post("/", async (req, res) => {
    const order = req.body;
    console.log("ok controller");
    res.json(await orders.cadastrarOrders(order));
    
});

router.get("/", async (req, res) => {
    res.json(await orders.buscarOrders());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await orders.buscarOrdersId(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await orders.deletarOrders(id));
});


module.exports = router;