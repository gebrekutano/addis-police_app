const express = require("express");
const router = express.Router();
const { createTrafficUser, updateOTP } = require("../controllers/trafficUser");
const { loginTrafficUser } = require("../controllers/trafficUser");

// Route to create a new traffic user
router.post("/traffic-users", createTrafficUser);

// Route to login a traffic user using email or tId and OTP
router.post("/traffic-users/login", loginTrafficUser);
router.put("/traffic-users/updateOtp", updateOTP);

module.exports = router;
