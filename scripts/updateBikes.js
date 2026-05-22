const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const updates = [
  {
    id: "695d07fd0406f6a5fda72aa9",
    data: {
      name: "Classic City Bike",
      description:
        "Comfortable 29-inch bike for relaxed rides through Centro Habana, Vedado and the Malecon.",
      type: "City bike",
      pricePerDay: 15,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aab",
    data: {
      name: "KTM Havana Explorer",
      description:
        "Sturdy 29-inch bike for longer city rides and uneven streets around Havana.",
      type: "Mountain bike",
      pricePerDay: 18,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa1",
    data: {
      name: "Scott Compact City Bike",
      description:
        "Easy-to-handle 26-inch bike for short rides around Old Havana and nearby neighborhoods.",
      type: "City bike",
      pricePerDay: 14,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aaa",
    data: {
      name: "Scott Malecon Rider",
      description:
        "Fast 29-inch bike for comfortable rides along the Malecon and wider city avenues.",
      type: "Hybrid bike",
      pricePerDay: 17,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa5",
    data: {
      name: "Trek City Cruiser",
      description:
        "Reliable 26-inch bike for sightseeing, errands and relaxed rental days in Havana.",
      type: "City bike",
      pricePerDay: 15,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa8",
    data: {
      name: "Stevens Adventure 29",
      description:
        "Strong 29-inch bike for riders who want extra comfort on longer routes.",
      type: "Mountain bike",
      pricePerDay: 18,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa6",
    data: {
      name: "Kona Easy Ride",
      description:
        "Compact 26-inch bike for easy city rides and comfortable daily rentals.",
      type: "City bike",
      pricePerDay: 14,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa7",
    data: {
      name: "Atala City Comfort",
      description:
        "Comfortable 26-inch bike for casual sightseeing around Havana.",
      type: "City bike",
      pricePerDay: 14,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa2",
    data: {
      name: "Scott Urban Ride",
      description:
        "Practical 26-inch bike for flexible city routes and shorter rental trips.",
      type: "Hybrid bike",
      pricePerDay: 15,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa3",
    data: {
      name: "Novara Havana Classic",
      description:
        "Comfortable 26-inch bike for tourists exploring central Havana.",
      type: "City bike",
      pricePerDay: 14,
      isActive: true,
    },
  },
  {
    id: "695d07fd0406f6a5fda72aa4",
    data: {
      name: "Novara Family Ride",
      description:
        "Easy 26-inch bike for relaxed rides and family-friendly rental days.",
      type: "City bike",
      pricePerDay: 14,
      isActive: true,
    },
  },
];

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

async function updateBikes() {
  const shouldApply = process.argv.includes("--apply");

  loadEnvLocal();

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI was not found in .env.local");
  }

  console.log(
    shouldApply
      ? "Applying bike updates to MongoDB Atlas..."
      : "Dry run only. Add --apply to update MongoDB Atlas."
  );

  await mongoose.connect(process.env.MONGODB_URI);

  const bikesCollection = mongoose.connection.collection("bikes");

  for (const update of updates) {
    if (!shouldApply) {
      console.log(`${update.id}: would set ${JSON.stringify(update.data)}`);
      continue;
    }

    const result = await bikesCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(update.id) },
      { $set: update.data }
    );

    console.log(
      `${update.id}: matched ${result.matchedCount}, modified ${result.modifiedCount}`
    );
  }

  await mongoose.disconnect();
}

updateBikes().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
