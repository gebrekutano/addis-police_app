const PlateCode = require("../models/plateCode"); // Import the PlateCode model
const PlateRegion = require("../models/PlateRegion"); // Import the PlateRegion model
plateController = {
  getAllPlateRegions: async (req, res) => {
    try {
      // Retrieve all documents from the PlateRegion collection
      const plateRegions = await PlateRegion.find();

      // Return the retrieved plateRegions as JSON response
      res.json(plateRegions);
    } catch (error) {
      // If an error occurs, send a 500 status response with the error message
      res.status(500).json({ message: error.message });
    }
  },

  getAllPlateCodes: async (req, res) => {
    try {
      // Retrieve all documents from the PlateCode collection
      const plateCodes = await PlateCode.find();

      // Return the retrieved plateCodes as JSON response
      res.json(plateCodes);
    } catch (error) {
      // If an error occurs, send a 500 status response with the error message
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = plateController;
