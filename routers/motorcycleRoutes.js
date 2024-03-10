// motorcycleRoutes.js
const express = require("express");
const router = express.Router();
const motorcycleController = require("../controllers/motorcycleController");

// Define routes for motorcycles
router.get("/", motorcycleController.getAllMotorcycles);
router.get("/PlateCode", motorcycleController.getAllPlateCode);
router.get("/PlateRegion", motorcycleController.getAllPlateRegion);
router.post("/", motorcycleController.createMotorcycle);
router.get("/:id", motorcycleController.getMotorcycleById);
router.put("/:id", motorcycleController.updateMotorcycle);
router.delete("/:id", motorcycleController.deleteMotorcycle);
router.get(
  "/plate/:plateNo/:plateCode/:plateRegion",
  motorcycleController.getMotorcycleByPlateNumber
);
router.get(
  "/driver/:driverLicense",
  motorcycleController.getMotorcycleByDriverLicense
);
router.get(
  "/driverName/:driverName",
  motorcycleController.getMotorcycleByDriverName
);
router.get(
  "/ownerName/:ownerName",
  motorcycleController.getMotorcycleByOwnerName
);
router.get("/Wanted/lostMotor", motorcycleController.getLostPosts);
router.post("/lostMotor", motorcycleController.createLostMotorPost);
router.put("/Found/:id", motorcycleController.UpdateLostMotor);

module.exports = router;
