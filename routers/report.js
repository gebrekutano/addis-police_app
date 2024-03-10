const express = require("express");
const router = express.Router();
const WantedReport = require("../controllers/WantedReport");
const { verifyToken } = require("../middleware/authorizejs");
const getReport = require("../controllers/report");

router.get("/Reports/:filter", verifyToken, WantedReport.getCounts);

router.get("/dashboard/report", getReport.getReport);
module.exports = router;
