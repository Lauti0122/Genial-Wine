const express = require('express');
const router = express.Router();
const { postUser, getUser, updateUser } = require('../controllers/user.controller');


router.post("/register", postUser);
router.get("/user/:email", getUser);
router.put("/update/:email", updateUser);

module.exports = router;