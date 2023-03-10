const express = require("express");
const router = express.Router();

const users = require("./user.routes");
const wines = require("./wine.routes");
const orders = require("./order.routes");
const payment = require("./payment.routes");

module.exports = router;

router.use(express.json());

router.use("/auth", users);
router.use("/wines", wines);
router.use("/orders", orders);
router.use("/payment", payment);
