const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user");
const { createRole, getRoles } = require("../controllers/role");

// User registration route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/createrole", createRole);
router.get("/getrole", getRoles);

module.exports = router;
