const express = require("express");
const router = express.Router();
const orders = require("./orders.handller");

router.post("/", async (req, res) => {
    const order = req.body;
    res.json(await orders.cadastrarOrders(order));
});


module.exports = router;