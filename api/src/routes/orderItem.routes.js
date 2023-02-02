const express = require('express');
const router = express.Router();

const { postOrderItem, getOrderItems } = require("../controllers/orderItem.controller");

router.post("/", postOrderItem);
router.get("/", getOrderItems);

module.exports = router;