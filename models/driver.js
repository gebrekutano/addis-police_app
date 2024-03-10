const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    nationality: { type: String },
    region: { type: String },
    zone: { type: String },
    city: { type: String },
    kebele: { type: String },
    houseNo: { type: String },
    phoneNo: { type: String },
    email: { type: String },
    birthDate: { type: Date },
    licenseNumber: { type: String },
    licenseGiven: { type: Date },
    licenseExpire: { type: Date },
    drivingHistory: [{ type: String }],
    profileImage: { type: String },
    identityDocument: { type: String },
    isOwner: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
