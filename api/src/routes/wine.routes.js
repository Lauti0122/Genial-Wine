const express = require('express');
const router = express.Router();
const { getWines, postWines } = require("../controllers/wine.controllers.js");


router.get("/", getWines);
router.post("/", postWines);

module.exports = router;