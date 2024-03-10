const mongoose = require("mongoose");

const trafficSchema = new mongoose.Schema(
  {
    name: { type: String },
    trafficId: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    otp: { type: String },
    hasPasswordChanged: { type: Boolean, default: false },
    attempts: { type: Number },
  },
  {
    timestamps: true,
  }
);

const TrafficUser = mongoose.model("TrafficUser", trafficSchema);

module.exports = TrafficUser;
