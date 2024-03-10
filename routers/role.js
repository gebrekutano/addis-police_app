const express = require("express");
const router = express.Router();
const { createRole } = require("../controllers/role");

// Role creation route
router.post("/create", createRole);

module.exports = router;
