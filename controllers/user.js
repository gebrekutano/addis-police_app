const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, username, email, password, rolesId } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with 10 salt rounds

    // Create a new user instance with hashed password
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      rolesId,
    });

    // Save the new user to the database
    const user = await newUser.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Extract email/username and password from request body
    const { identifier, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        rolesId: user.rolesId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" } // Token expires in 6 hours
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log("meesa", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
