const Role = require("../models/role");

const createRole = async (req, res) => {
  try {
    // Extract role data from request body
    const { name, permissions } = req.body;

    // Create a new role instance
    const newRole = new Role({ name, permissions });

    // Save the new role to the database
    const role = await newRole.save();

    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all roles
const getRoles = async (req, res) => {
  try {
    // Fetch all roles from the database
    const roles = await Role.find();

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRole, getRoles };
