import dbConnect from "../../../db/connect";
import SiteSettings from "../../../db/models/SiteSettings";
import { getAdminSession } from "@/utils/auth";

const defaultSettings = {
  businessName: "Havana Bikes",
  currency: "$",
  hourlyPrice: 4,
  firstDayPrice: 15,
  additionalDayPrice: 10,
  depositAmount: 50,
  openingHours: "Monday - Sunday, 8:00 AM - 8:00 PM",
  address: "La Habana, Cuba",
  phone: "",
  whatsapp: "",
  email: "",
  pickupInfo:
    "Pickup and return details will be coordinated after your booking request is reviewed.",
  depositInfo:
    "The deposit is returned at the end of the rental when the bike is returned in good condition.",
};

const allowedFields = [
  "businessName",
  "currency",
  "hourlyPrice",
  "firstDayPrice",
  "additionalDayPrice",
  "depositAmount",
  "openingHours",
  "address",
  "phone",
  "whatsapp",
  "email",
  "pickupReturnInfo",
  "pickupInfo",
  "depositInfo",
];

const stringFields = [
  "businessName",
  "currency",
  "openingHours",
  "address",
  "phone",
  "whatsapp",
  "email",
  "pickupReturnInfo",
  "pickupInfo",
  "depositInfo",
];

const numberFields = [
  "hourlyPrice",
  "firstDayPrice",
  "additionalDayPrice",
  "depositAmount",
];

function sanitizeSettingsBody(body) {
  const settingsData = {};
  const fieldsToUpdate = Object.keys(body || {});
  const hasInvalidField = fieldsToUpdate.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasInvalidField) {
    return { error: "Invalid settings fields" };
  }

  for (const field of stringFields) {
    if (field in body) {
      if (typeof body[field] !== "string") {
        return { error: "Invalid settings fields" };
      }

      const fieldName = field === "pickupReturnInfo" ? "pickupInfo" : field;

      settingsData[fieldName] = body[field].trim();
    }
  }

  for (const field of numberFields) {
    if (field in body) {
      const value = Number(body[field]);

      if (Number.isNaN(value) || value < 0) {
        return {
          error: "Price and deposit values must be numbers greater than or equal to 0",
        };
      }

      settingsData[field] = value;
    }
  }

  return { settingsData };
}

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const siteSettings = await SiteSettings.findOne();

    if (siteSettings) {
      return response.status(200).json(siteSettings);
    }

    return response.status(200).json(defaultSettings);
  }

  if (request.method === "PUT") {
    const { status } = await getAdminSession(request, response);

    if (status === 401) {
      return response.status(401).json({ message: "Authentication required" });
    }

    if (status === 403) {
      return response.status(403).json({ message: "Admin access required" });
    }

    const { error, settingsData } = sanitizeSettingsBody(request.body || {});

    if (error) {
      return response.status(400).json({ message: error });
    }

    try {
      const existingSettings = await SiteSettings.findOne();

      if (!existingSettings) {
        const newSettings = await SiteSettings.create({
          ...defaultSettings,
          ...settingsData,
        });

        return response.status(200).json(newSettings);
      }

      const updatedSettings = await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        { $set: settingsData },
        { new: true }
      );

      return response.status(200).json(updatedSettings);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Settings could not be updated" });
    }
  }

  return response.status(405).json({ status: "Method Not Allowed" });
}
