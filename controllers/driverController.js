const Driver = require("../models/driver");
const Owner = require("../models/owner");

// Controller methods for drivers
const driverController = {
  // Get all drivers
  getAllDrivers: async (req, res) => {
    try {
      const drivers = await Driver.find();
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // create driver information
  createDriver: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        nationality,
        region,
        zone,
        city,
        kebele,
        isOwner,
        houseNo,
        phoneNo,
        email,
        birthDate,
        licenseNumber,
        licenseGiven,
        licenseExpire,
        drivingHistory,
      } = req.body;
      const profileImageFilename = req.files["profileImage"]
        ? req.files["profileImage"][0].filename
        : null;
      const identityDocumentFilename = req.files["identityDocument"]
        ? req.files["identityDocument"][0].filename
        : null;

      let owner = false;
      if (isOwner === "driver") {
        owner = false;
      } else {
        owner = true;
      }
      const newDriver = new Driver({
        firstName,
        lastName,
        gender,
        nationality,
        region,
        zone,
        city,
        kebele,
        houseNo,
        phoneNo,
        email,
        birthDate,
        licenseNumber,
        isOwner: owner,
        licenseGiven,
        licenseExpire,
        drivingHistory,
        profileImage: profileImageFilename,
        identityDocument: identityDocumentFilename,
        //   profileImage: req.files["profileImage"][0].path,
        //   identityDocument: req.files["identityDocument"][0].path,
      });

      const savedDriver = await newDriver.save();
      if (!savedDriver) {
        console.error("Failed to save driver data");
      }

      res.status(201).json(savedDriver);
    } catch (error) {
      console.error("Error creating driver:", error);
      res.status(400).json({ message: error.message });
    }
  },

  createOwner: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        nationality,
        region,
        zone,
        city,
        kebele,
        houseNo,
        phoneNo,
        email,
        birthDate,
        profileImage,
        identityDocument,
      } = req.body;
      const profileImagePath = req.files["profileImage"]
        ? req.files["profileImage"][0].path
        : null;
      const identityDocumentPath = req.files["identityDocument"]
        ? req.files["identityDocument"][0].path
        : null;
      const newOwner = new Owner({
        firstName,
        lastName,
        gender,
        nationality,
        region,
        zone,
        city,
        kebele,
        houseNo,
        phoneNo,
        email,
        birthDate,

        profileImage: profileImagePath,
        identityDocument: identityDocumentPath,
      });

      const savedDriver = await newOwner.save();
      if (!savedDriver) {
        console.error("Failed to save driver data");
      }

      res.status(201).json(savedDriver);
    } catch (error) {
      console.error("Error creating driver:", error);
      res.status(400).json({ message: error.message });
    }
  },

  // Get a driver by ID
  getDriverById: async (req, res) => {
    try {
      const driver = await Driver.findById(req.params.id);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.json(driver);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a driver by ID
  updateDriver: async (req, res) => {
    try {
      // Check if isOwner is provided in the request body
      if (req.body.hasOwnProperty("isOwner")) {
        // If isOwner is true or 'owner', set it to true, else set it to false
        req.body.isOwner =
          req.body.isOwner === true || req.body.isOwner === "owner";
      }

      const updatedDriver = await Driver.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updatedDriver);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a driver by ID
  deleteDriver: async (req, res) => {
    try {
      await Driver.findByIdAndDelete(req.params.id);
      res.json({ message: "Driver deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = driverController;
