const express = require("express");
const router = express.Router();
const multer = require("multer"); // For handling file uploads
const driverController = require("../controllers/driverController");
const { verifyToken, authorizeRole } = require("../middleware/authorizejs");
const storage = multer.diskStorage({
  // Destination directory where files will be stored
  destination: function (req, file, cb) {
    cb(null, "public/driversFile/"); // Specify the directory where files will be stored
  },
  // Filename configuration
  filename: function (req, file, cb) {
    // Use Date.now() to generate a unique timestamp
    const timestamp = Date.now();
    // Extract the original file extension
    const fileExtension = file.originalname.split(".").pop();
    // Generate a unique filename by combining timestamp and original filename
    const uniqueFilename = `${timestamp}-${file.originalname}`;
    cb(null, uniqueFilename); // Pass the generated filename to the callback function
  },
});
const upload = multer({ storage: storage });

// Define routes for drivers
router.get("/", driverController.getAllDrivers);

router.post(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "identityDocument", maxCount: 1 },
  ]),
  driverController.createDriver
);
router.post(
  "/owner",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "identityDocument", maxCount: 1 },
  ]),
  driverController.createOwner
);
router.get("/:id", driverController.getDriverById);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
