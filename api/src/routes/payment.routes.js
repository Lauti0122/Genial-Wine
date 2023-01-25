const express = require('express');
const router = express.Router();

const { makePayment } = require("../controllers/payment.controllers");

router.post("/", makePayment);

module.exports = router;