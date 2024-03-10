const Motorcycle = require("../models/Motorcycle");
const PlateRegion = require("../models/PlateRegion");
const Driver = require("../models/driver");
const Owner = require("../models/owner");
const PlateCode = require("../models/plateCode");
const Post = require("../models/post");
const mongoose = require("mongoose");
const isValidObjectId = (str) => {
  return mongoose.Types.ObjectId.isValid(str);
};
// Controller methods for motorcycles
const motorcycleController = {
  // Get all motorcycles
  getAllMotorcycles: async (req, res) => {
    try {
      const motorcycles = await Motorcycle.find()
        .populate("drivers")
        .populate("plateCode")
        .populate("plateRegion");
      res.json(motorcycles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllPlateCode: async (req, res) => {
    try {
      const plateCodes = await PlateCode.find();
      res.json(plateCodes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllPlateRegion: async (req, res) => {
    try {
      const plateRegions = await PlateRegion.find();
      res.json(plateRegions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new motorcycle
  createMotorcycle: async (req, res) => {
    try {
      // Destructure request body including owner information
      //  console.log("are you caome here ");
      const {
        plateNo,
        shansiNo,
        vehicleModel,
        vehicleType,
        modelYear,
        color,
        capacity,
        registrationExpiryDate,
        registrationRenewalDate,
        drivers,
        motorNo,
        plateCode,
        plateRegion,
      } = req.body;
      console.log(req.body);

      // Create a new motorcycle instance
      const motorcycle = new Motorcycle({
        plateNo,
        shansiNo,
        vehicleModel,
        vehicleType,
        modelYear,
        color,
        motorNo,
        capacity,
        registrationExpiryDate,
        registrationRenewalDate,
        drivers,
        plateCode,
        plateRegion,
      });

      // Save the new motorcycle to the database
      const newMotorcycle = await motorcycle.save();

      // Send response with the newly created motorcycle
      res.status(201).json(newMotorcycle);
    } catch (error) {
      // Handle any errors
      res.status(400).json({ message: error.message });
    }
  },

  // Get a motorcycle by ID
  getMotorcycleById: async (req, res) => {
    try {
      const motorcycle = await Motorcycle.findById(req.params.id)
        .populate("drivers")
        .populate("plateCode")
        .populate("plateRegion");
      if (motorcycle == null) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      res.json(motorcycle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a motorcycle by ID
  updateMotorcycle: async (req, res) => {
    try {
      const updatedMotorcycle = await Motorcycle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedMotorcycle);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log("error ", error.message);
    }
  },

  // Delete a motorcycle by ID
  deleteMotorcycle: async (req, res) => {
    try {
      await Motorcycle.findByIdAndDelete(req.params.id);
      res.json({ message: "Motorcycle deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMotorcycleByPlateNumber: async (req, res) => {
    try {
      console.log("plateNo:", req.params.plateNo);
      console.log("plateCode:", req.params.plateCode);
      console.log("plateRegion:", req.params.plateRegion);

      const { plateCode, plateRegion } = req.params;

      // Convert plateCode to ObjectId if it's not a valid ObjectId
      const platecc = isValidObjectId(plateCode)
        ? mongoose.Types.ObjectId(plateCode)
        : (await PlateCode.findOne({ code: plateCode }))?._id; // Use 'id' instead of '_id'

      // Convert plateRegion to ObjectId if it's not a valid ObjectId
      const platerr = isValidObjectId(plateRegion)
        ? mongoose.Types.ObjectId(plateRegion)
        : (await PlateRegion.findOne({ code: plateRegion }))?._id; // Use 'id' instead of '_id'

      // Find the motorcycle by plate number and related plateCode and plateRegion
      const motorcycle = await Motorcycle.findOne({
        plateNo: req.params.plateNo,
        plateCode: platecc,
        plateRegion: platerr,
      })
        .populate("plateCode")
        .populate("drivers")
        .populate("plateRegion"); // Populate the drivers field

      if (!motorcycle) {
        return res.status(200).json({ message: "Motorcycle not found" });
      }
      res.json(motorcycle);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Find motorcycle by driver's license
  getMotorcycleByDriverLicense: async (req, res) => {
    try {
      const driver = await Driver.findOne({
        licenseNumber: req.params.driverLicense,
      });
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      const motorcycle = await Motorcycle.findOne({
        drivers: driver._id,
      })
        .populate("drivers")
        .populate("plateCode")
        .populate("plateRegion");
      if (!motorcycle) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      res.json(motorcycle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Find motorcycles by driver's first name and last name
  getMotorcycleByDriverName: async (req, res) => {
    try {
      // Get the driver name from the request params
      const driverName = req.params.driverName;

      // Split the input driver name into parts
      const nameParts = driverName.split(" ");

      // Find drivers whose first name or last name contains any part of the input string
      const drivers = await Driver.find({
        $or: [
          { firstName: { $regex: nameParts.join("|"), $options: "i" } },
          { lastName: { $regex: nameParts.join("|"), $options: "i" } },
        ],
      });

      if (!drivers || drivers.length === 0) {
        return res.status(200).json([]);
      }

      // Use a Set to store unique drivers
      const uniqueDrivers = new Set();

      // Add each driver to the Set
      drivers.forEach((driver) => uniqueDrivers.add(driver));

      // Convert the Set back to an array
      const uniqueDriverList = Array.from(uniqueDrivers);

      // Return the unique list of drivers
      res.json(uniqueDriverList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMotorcycleByOwnerName: async (req, res) => {
    try {
      // Get the owner name from the request params
      const ownerName = req.params.ownerName;

      // Create a regex pattern to match the owner's name
      const regex = new RegExp(ownerName, "i"); // 'i' flag for case-insensitive matching

      // Find owners matching the regex pattern for first name or last name
      const owners = await Owner.find({
        $or: [
          { firstName: { $regex: regex } },
          { lastName: { $regex: regex } },
        ],
      });

      if (!owners || owners.length === 0) {
        return res.status(404).json({ message: "Owner not found" });
      }

      // Map each owner to a promise that finds their motorcycle
      const motorcyclePromises = owners.map((owner) =>
        Motorcycle.findOne({ owner: owner._id })
          .populate("drivers")
          .populate("plateCode")
          .populate("plateRegion")
      );

      // Execute all promises in parallel
      const motorcycles = await Promise.all(motorcyclePromises);

      // Filter out null values (motorcycles not found) and send the result
      res.json(motorcycles.filter((motorcycle) => motorcycle !== null));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //  to create a post when a motor is lost
  createLostMotorPost: async (req, res) => {
    const isValidObjectId = (str) => {
      return mongoose.Types.ObjectId.isValid(str);
    };
    try {
      const {
        isLost,
        plateNo,
        plateCode,
        plateRegion,
        bikeId,
        description,
        reportedDate,
        color,
        foundDate,
      } = req.body;

      console.log(req.body);
      let motorcycles;
      // Check if the provided input is a valid ObjectId
      motorcycles = await Post.findOne({ bikeId: bikeId });
      console.log("motorcycles:", motorcycles);
      let platecc;
      let platerr;
      const plateC = isValidObjectId(plateCode);
      const plateR = isValidObjectId(plateRegion);
      console.log("platecc", plateC);

      if (!plateC) {
        const plate = await PlateCode.findOne({ code: plateCode });
        platecc = plate._id;
      } else {
        platecc = plateCode;
      }

      if (!plateR) {
        const plate = await PlateRegion.findOne({ code: plateRegion });
        platerr = plate._id;
      } else {
        platerr = plateRegion;
      }
      motorcycles = await Post.findOne({
        plateNo: plateNo,
        plateCode: platecc,
        plateRegion: platerr,
      });

      if (!motorcycles) {
        // If motorcycle not found, create a new post as lost using bikeId
        const defaultDescription =
          description ||
          `The Motorcycle with Plate Number ${plateNo} Reported As Lost`;

        const lostMotorPost = new Post({
          color: color,
          description: defaultDescription,
          bikeId: bikeId || null,
          isLost: isLost || true, // Default to true if isLost is not provided
          plateNo: plateNo,
          plateCode: platecc,
          plateRegion: platerr,
          reportedDate: reportedDate || new Date(), // Default to current date if reportedDate is not provided
          foundDate: foundDate, // Include foundDate if provided
        });

        // Save the new post to the database
        const savedPost = await lostMotorPost.save();
        return res.status(201).json(savedPost); // Return the created post
      } else {
        return res
          .status(217)
          .json({ message: "Motorcycle already exists in the database" });
      }
    } catch (error) {
      console.error("Error creating Lost Motor Post:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getLostPosts: async (req, res) => {
    try {
      const lostPosts = await Post.find({ isLost: true })
        .populate("plateCode")
        .populate("plateRegion")
        .sort({ timestamp: -1 }); // Sort by timestamp field in descending order
      res.json(lostPosts);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: "Internal server error" });
    }
  },

  UpdateLostMotor: async (req, res) => {
    const { id } = req.params; // Get wantedid from request params
    const { isLost, description } = req.body; // Get isLost from request body
    try {
      // Find the post by wantedid
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Update the post fields
      post.isLost = isLost; // Set isLost to the value provided in the request body

      if (isLost === false) {
        // If isLost is set to false, set foundDate to the current date
        post.foundDate = new Date();

        // Ensure descriptions field is an array
        if (!Array.isArray(post.description)) {
          post.description = [];
        }

        // Add the new description to the list
        post.description.push(
          description ||
            `Motorcycle with Plate Number ${post.plateNo} is Reported as Found`
        );
      } else {
        // If isLost is true, set reportedDate to the current date
        post.reportedDate = new Date();
      }

      // Save the updated post
      await post.save();

      // Return the updated post to the client
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = motorcycleController;
