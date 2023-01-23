const express = require("express");
const router = express.Router();

const users = require("./user.routes.js");
const wines = require("./wine.routes.js");

router.use(express.json());

router.use("/auth", users); 
router.use("/wines", wines)

module.exports = router;