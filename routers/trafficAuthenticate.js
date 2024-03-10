const express = require("express");
const router = express.Router();
const trafficAuthController = require("../controllers/trafficAuthenticate");

// Role creation route
router.post("/generate-random", trafficAuthController.generateRandomAndSave);

module.exports = router;
