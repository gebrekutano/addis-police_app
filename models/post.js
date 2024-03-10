const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    plateNo: { type: String, required: true },
    plateCode: { type: mongoose.Schema.Types.ObjectId, ref: "PlateCode" },
    plateRegion: { type: mongoose.Schema.Types.ObjectId, ref: "PlateRegion" },
    color: { type: String },
    description: { type: [String], default: [] },
    bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Motorcycle" }, // Reference to Motorcycle schema
    isLost: { type: Boolean, default: true }, // Indicates if the motorcycle is lost
    reportedDate: Date, // Date when the motorcycle was reported lost
    foundDate: Date, // Date when the motorcycle was found
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
