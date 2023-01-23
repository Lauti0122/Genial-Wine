const express = require('express');
const { getWines } = require("../controllers/wine.controllers.js");

const router = express.Router();

router.get("/", getWines);

module.exports = router;