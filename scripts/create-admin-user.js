const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
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

function validateEnvironment() {
  const requiredEnvironmentVariables = [
    "MONGODB_URI",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "ADMIN_NAME",
  ];

  const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (key) => !process.env[key]
  );

  if (missingEnvironmentVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvironmentVariables.join(", ")}`
    );
  }
}

async function createAdminUser() {
  loadEnvLocal();
  validateEnvironment();

  const { default: dbConnect } = await import("../db/connect.js");
  const { default: User } = await import("../db/models/User.js");
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  await dbConnect();

  const adminUser = await User.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL },
    {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      passwordHash,
      role: "admin",
    },
    { new: true, upsert: true, runValidators: true }
  );

  console.log(`Admin user saved: ${adminUser.email}`);
  await mongoose.disconnect();
}

createAdminUser().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
