const plateController = require("../controllers/PlateInfo");
const express = require("express");
const router = express.Router();

// Route to get all plate regions
router.get("/PlateRegion", plateController.getAllPlateRegions);
router.get("/PlateCode", plateController.getAllPlateCodes);
module.exports = router;
