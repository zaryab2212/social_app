const express = require("express");
const { loginUser } = require("../Controllers/Auth");
const router = express.Router();

router.post("/login", loginUser);

module.exports = router;
