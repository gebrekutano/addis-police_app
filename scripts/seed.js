const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI

// Sample data for plate codes
const plateCodes = [
  { code: "1", description: "Taxi" },
  { code: "2", description: "Private" },
  { code: "3", description: "Commercial/Business" },
  { code: "4", description: "Government" },
  { code: "5", description: "Foreign/International Organizations" },
  { code: "UN", description: "United Nations" },
  { code: "AU", description: "African Union" },
  { code: "ልዩ", description: "Special" },
  { code: "ተላላፊ", description: "Temporary" },
  { code: "ልዩ", description: "Daily" },
];

// Sample data for plate regions
const plateRegions = [
  { code: "AA", name: "Addis Ababa" },
  { code: "OR", name: "Oromia" },
  { code: "AM", name: "Amhara" },
  { code: "TG", name: "Tigray" },
  { code: "SN", name: "Southern Nations, Nationalities, and Peoples" },
  { code: "AF", name: "Afar" },
  { code: "BG", name: "Benishangul-Gumuz" },
  { code: "DR", name: "Dire Dawa" },
  { code: "GM", name: "Gambela" },
  { code: "HR", name: "Harar" },
  { code: "SM", name: "Somali" },
];

async function seedData() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to MongoDB
    await client.connect();

    // Select database
    const database = client.db("VehicleDB"); // Update with your database name

    // Insert data into PlateCode collection
    await insertData(database, "platecodes", plateCodes);

    // Insert data into PlateRegion collection
    await insertData(database, "plateregions", plateRegions);

    console.log(
      "Data seeded successfully into PlateCode and PlateRegion collections!"
    );
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function insertData(database, collectionName, data) {
  const collection = database.collection(collectionName);
  await collection.insertMany(data);
  console.log(`Data seeded into ${collectionName} collection`);
}

// Call the seeding function
seedData();
