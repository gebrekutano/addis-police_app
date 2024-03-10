const TrafficAuth = require("../models/trafficAuthenticate");

function getRandomCharacter(str) {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * str.length);
  // Return the character at the random index
  return str.charAt(randomIndex);
}

function generateRandomString(firstName, lastName, phoneNumber) {
  // Concatenate all input strings into one
  const combinedString = firstName + lastName + phoneNumber;
  let randomString = "";

  // Generate random characters
  for (let i = 0; i < 8; i++) {
    // Get a random character from each string
    const randomChar = getRandomCharacter(combinedString);
    // Append the random character to the random string
    randomString += randomChar;
  }

  return randomString;
}

// Controller function to handle generating random string and saving to collection
const generateRandomAndSave = async (req, res) => {
  const { firstName, lastName, phoneNumber, trafficId } = req.body;

  const randomString = generateRandomString(firstName, lastName, phoneNumber);

  try {
    // Save to MongoDB collection
    const trafficAuth = new TrafficAuth({
      trafficId: trafficId,
      firstName,
      lastName,
      phoneNumber,
      authKey: randomString,
    });
    await trafficAuth.save();

    res.status(201).json({ success: true, trafficId: randomString });
  } catch (error) {
    console.error("Error saving to collection:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to save to collection" });
  }
};

module.exports = {
  generateRandomAndSave,
};
