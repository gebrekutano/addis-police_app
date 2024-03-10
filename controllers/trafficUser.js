const TrafficUser = require("../models/trafficUser");

// Function to generate a random OTP
const generateOTP = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < 8; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
};

// Controller to handle the creation of traffic users
const createTrafficUser = async (req, res) => {
  try {
    const { name, trafficId, email } = req.body;

    // Check if the traffic user already exists
    let trafficUser = await TrafficUser.findOne({ trafficId });

    if (trafficUser) {
      return res.status(217).json({ error: "Traffic user already exists" });
    }

    // Generate a random OTP
    const otp = generateOTP();

    // Create a new traffic user instance
    trafficUser = new TrafficUser({
      name,
      trafficId,
      email,
      otp,
      attempts: 0,
    });

    // Save the new traffic user to the database
    await trafficUser.save();

    res.status(201).json(trafficUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const loginTrafficUser = async (req, res) => {
  try {
    const { emailOrtId, otp } = req.body;

    // Check if email and OTP are provided
    if (!emailOrtId || !otp) {
      return res
        .status(210)
        .json({ error: "emailOrtId or tId and OTP are required" });
    }

    // Find traffic user by email or tId
    const trafficUser = await TrafficUser.findOne({
      $or: [{ email: emailOrtId }, { trafficId: emailOrtId }],
    });

    if (!trafficUser) {
      return res.status(217).json({ error: "Traffic user not found" });
    }

    // Check if OTP matches
    if (trafficUser.otp !== otp) {
      return res.status(210).json({ error: "Invalid OTP" });
    }

    await trafficUser.save();

    res.status(201).json(trafficUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateOTP = async (req, res) => {
  try {
    const { emailOrtId, newOTP } = req.body;

    // Check if emailOrtId and new OTP are provided
    if (!emailOrtId || !newOTP) {
      return res
        .status(210)
        .json({ error: "emailOrtId and new OTP are required" });
    }

    // Find traffic user by email or tId
    const trafficUser = await TrafficUser.findOne({
      $or: [{ email: emailOrtId }, { trafficId: emailOrtId }],
    });

    if (!trafficUser) {
      return res.status(217).json({ error: "Traffic user not found" });
    }

    // Update the OTP
    trafficUser.hasPasswordChanged = true;
    trafficUser.otp = newOTP;
    await trafficUser.save();

    res.status(200).json(trafficUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTrafficUser,
  loginTrafficUser,
  updateOTP,
};
