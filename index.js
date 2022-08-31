const express = require("express");
const cors = require("cors");
const port = 3000;

const router = express();

router.use(express.json())
router.use(cors());

const routes = require("./api/route");

router.use("/api", routes);

router.listen(port, () => { 
    console.log(`Servidor escutando a porta: ${port}`)
})