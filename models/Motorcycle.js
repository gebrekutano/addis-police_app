const mongoose = require("mongoose");

const motorcycleSchema = new mongoose.Schema(
  {
    plateNo: { type: String, required: true, unique: true },
    shansiNo: { type: String, required: true, unique: true }, //!Vehicle Identification Number (VIN)
    vehicleModel: { type: String, required: true },
    vehicleType: { type: String, required: true },
    modelYear: { type: String, required: true },
    color: { type: String, required: true },
    capacity: { type: Number, required: true },
    motorNo: { type: String, required: true, unique: true },
    registrationExpiryDate: { type: Date },
    registrationRenewalDate: { type: Date },
    plateCode: String,
    plateRegion: String,

    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }], // Reference to the Driver model
    plateCode: { type: mongoose.Schema.Types.ObjectId, ref: "PlateCode" }, // Reference to the PlateCode model
    plateRegion: { type: mongoose.Schema.Types.ObjectId, ref: "PlateRegion" }, // Reference to the PlateRegion model
  },
  {
    timestamps: true,
  }
);

const Motorcycle = mongoose.model("Motorcycle", motorcycleSchema);

module.exports = Motorcycle;
