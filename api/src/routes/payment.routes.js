const express = require('express');
const { makePaymentMP, makeOrderPP, capturePayment, cancelPayment } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/mp", makePaymentMP);
router.post("/pp/orders", makeOrderPP);
router.get("/pp/capture", capturePayment);
router.get("/pp/cancel", cancelPayment);

module.exports = router;