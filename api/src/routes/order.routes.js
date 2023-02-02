const express = require('express');
const router = express.Router();
const { getOrders, postOrder } = require('../controllers/order.controller');


router.get("/", getOrders);
router.post("/", postOrder);

module.exports = router;