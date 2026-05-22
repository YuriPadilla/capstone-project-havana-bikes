const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf8");

  envFile.split("\n").forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex);
    const value = trimmedLine
      .slice(separatorIndex + 1)
      .replace(/^["']|["']$/g, "");

    process.env[key] = value;
  });
}

async function listBikes() {
  loadEnvLocal();

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI was not found in .env.local");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const bikes = await mongoose.connection.collection("bikes").find().toArray();

  bikes.forEach((bike, index) => {
    console.log(`${index + 1}. ${bike._id}`);
    console.log(`   brand: ${bike.brand || ""}`);
    console.log(`   size: ${bike.size || ""}`);
    console.log(`   imageSource: ${bike.imageSource || ""}`);
    console.log(`   name: ${bike.name || ""}`);
    console.log(`   type: ${bike.type || ""}`);
    console.log(`   pricePerDay: ${bike.pricePerDay ?? ""}`);
    console.log(`   isActive: ${bike.isActive ?? ""}`);
  });

  await mongoose.disconnect();
}

listBikes().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
