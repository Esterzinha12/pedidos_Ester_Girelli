const express= require("express");
const router = express.Router();


const users = require("./users/users.controller");
const products = require("./products/products.controller");
const orders = require("./orders/orders.controller");
const orderProducts = require("./orderProducts/orderProducts.controller");



router.use("/users", users);
router.use("/orders", orders);
router.use("/products", products);
router.use("/orderProducts", orderProducts);



module.exports= router;