// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const motorcycleRoutes = require("./routers/motorcycleRoutes");
const driverRoutes = require("./routers/driverRoutes");
const userRouter = require("./routers/user");
const roleRouter = require("./routers/role");
const PlateRouter = require("./routers/plateRouter");
const trafficUser = require("./routers/trafficUser");
const Report = require("./routers/report");
const cors = require("cors");

// Create Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());
// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/VehicleDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.static("public"));
// Use motorcycle routes
app.use("/api/motorcycles", motorcycleRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/users", userRouter);
app.use("/api/Plate", PlateRouter);
app.use("/api/roles", roleRouter);
app.use("/api", Report);
app.use("/api", trafficUser);

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
