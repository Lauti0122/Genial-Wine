const express = require('express');
const router = express.Router();
const { postShipping } = require("../controllers/shipping.controller.js");


router.post("/", postShipping);


module.exports = router;