const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  nationality: { type: String },
  region: { type: String },
  zone: { type: String },
  city: { type: String },
  kebele: { type: String },
  houseNo: { type: String },
  phoneNo: { type: String, unique: true },
  email: { type: String, unique: true },
  birthDate: { type: Date },
  profileImage: { type: String },
  identityDocument: { type: String },
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
