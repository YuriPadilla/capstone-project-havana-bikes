/*
Seed script for Havana Bikes - inserts sample bikes into MongoDB.
Usage: MONGODB_URI="your-uri-here" node scripts/seed.js
*/

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const bikes = [
  {
    brand: "Havana Cruiser",
    size: "M",
    imageSource:
      "https://res.cloudinary.com/demo/image/upload/v1610000000/sample_bike_1.jpg",
  },
  {
    brand: "Malecon Rider",
    size: "L",
    imageSource:
      "https://res.cloudinary.com/demo/image/upload/v1610000000/sample_bike_2.jpg",
  },
  {
    brand: "Old Havana",
    size: "S",
    imageSource:
      "https://res.cloudinary.com/demo/image/upload/v1610000000/sample_bike_3.jpg",
  },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("ERROR: Please set MONGODB_URI in your environment or .env.local");
      process.exit(1);
    }

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    // Clear the bikes collection
    await db.collection("bikes").deleteMany({});
    console.log("Cleared bikes collection.");

    const result = await db.collection("bikes").insertMany(bikes);
    console.log(`Inserted ${result.insertedCount} bikes.`);

    await mongoose.disconnect();
    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
