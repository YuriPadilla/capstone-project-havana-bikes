import formidable from "formidable";
import dbConnect from "../../../../db/connect";
import Bike from "../../../../db/models/Bike";
import cloudinary from "@/utils/cloudinary";
import { getAdminSession } from "@/utils/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(request) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ fields, files });
    });
  });
}

function getFieldValue(fields, fieldName) {
  const value = fields[fieldName];

  return Array.isArray(value) ? value[0] : value;
}

function getUploadedFile(files, fieldName) {
  const file = files[fieldName];

  return Array.isArray(file) ? file[0] : file;
}

function convertFormBoolean(value) {
  if (value === "false") {
    return false;
  }

  if (value === "true" || value === "on") {
    return true;
  }

  return Boolean(value);
}

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "POST") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  const { status } = await getAdminSession(request, response);

  if (status === 401) {
    return response.status(401).json({ message: "Authentication required" });
  }

  if (status === 403) {
    return response.status(403).json({ message: "Admin access required" });
  }

  try {
    await dbConnect();

    if (request.method === "GET") {
      const bikes = await Bike.find();

      return response.status(200).json(bikes);
    }

    let parsedForm;

    try {
      parsedForm = await parseForm(request);
    } catch (error) {
      return response.status(400).json({
        message: "Bike form data could not be parsed",
      });
    }

    const { fields, files } = parsedForm;
    const imageFile = getUploadedFile(files, "image");
    const pricePerDayValue = getFieldValue(fields, "pricePerDay");
    const bikeData = {
      name: getFieldValue(fields, "name")?.trim(),
      brand: getFieldValue(fields, "brand")?.trim(),
      size: getFieldValue(fields, "size")?.trim(),
      type: getFieldValue(fields, "type")?.trim(),
      description: getFieldValue(fields, "description")?.trim(),
      pricePerDay: Number(pricePerDayValue),
      isActive: convertFormBoolean(getFieldValue(fields, "isActive")),
    };

    if (
      !bikeData.name ||
      !bikeData.brand ||
      !bikeData.size ||
      !bikeData.type ||
      !bikeData.description ||
      !String(pricePerDayValue ?? "").trim()
    ) {
      return response.status(400).json({
        message:
          "Name, brand, size, type, description and price per day are required",
      });
    }

    if (Number.isNaN(bikeData.pricePerDay) || bikeData.pricePerDay < 0) {
      return response.status(400).json({
        message: "Price per day must be a number greater than or equal to 0",
      });
    }

    if (!imageFile) {
      return response.status(400).json({ message: "Bike image is required" });
    }

    if (!imageFile.mimetype?.startsWith("image/")) {
      return response.status(400).json({
        message: "Bike image must be an image file",
      });
    }

    let uploadResult;

    try {
      uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: "havana-bikes/bikes",
      });
    } catch (error) {
      return response.status(502).json({
        message: "Image upload failed. Please try again.",
      });
    }

    let newBike;

    try {
      newBike = await Bike.create({
        ...bikeData,
        imageSource: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Bike could not be created. Please try again.",
      });
    }

    return response.status(201).json(newBike);
  } catch (error) {
    if (request.method === "POST") {
      return response.status(500).json({
        message: "Bike could not be created. Please try again.",
      });
    }

    return response.status(500).json({ message: "Bikes could not be loaded" });
  }
}
