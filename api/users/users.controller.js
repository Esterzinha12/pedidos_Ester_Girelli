const express = require("express");
const router = express.Router();
const users = require("./users.handller")

router.post("/", async (req, res) => {
    const user = req.body;
    res.json(await users.cadastrarUser(user));
    
});

router.get("/", async (req, res) => {
    res.json(await users.buscarUser());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await users.buscarUser(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await users.deletarUser(id));
});

module.exports = router;