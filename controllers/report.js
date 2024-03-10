const Motorcycle = require("../models/Motorcycle");
const User = require("../models/user");
const Traffic = require("../models/trafficUser");
const Driver = require("../models/driver");

exports.getReport = async (req, res) => {
  let driver;
  let owner;
  let trafficUser;
  let admin;
  let motorcycle;

  try {
    driver = await Driver.countDocuments({ isOwner: false });
    owner = await Driver.countDocuments({ isOwner: true });

    trafficUser = await Traffic.countDocuments({});
    admin = await User.countDocuments({
      isLost: true,
    });
    motorcycle = await Motorcycle.countDocuments({});
    return res.json({ driver, owner, trafficUser, admin, motorcycle });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
