const express = require("express");
const app = express();
const router = require("./api/route");
const route= express.Router();
route.use(router);
app.use(route);

app.use("/api", router);
app.listen(3000, () => {
    console.log("app listen on http://localhost: 3000")
})