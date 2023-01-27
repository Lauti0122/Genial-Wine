const express = require('express');
const router = express.Router();
const { getWines, postWines, updateWine } = require("../controllers/wine.controllers.js");


router.get("/", getWines);
router.post("/", postWines);
router.put("/update/:id", updateWine);
module.exports = router;