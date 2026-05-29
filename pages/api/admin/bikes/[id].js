import mongoose from "mongoose";
import dbConnect from "../../../../db/connect";
import Bike from "../../../../db/models/Bike";
import { getAdminSession } from "@/utils/auth";

const allowedFields = [
  "name",
  "brand",
  "size",
  "type",
  "description",
  "pricePerDay",
  "imageSource",
  "isActive",
];
const stringFields = [
  "name",
  "brand",
  "size",
  "type",
  "description",
  "imageSource",
];
const editableFields = [
  "name",
  "brand",
  "size",
  "type",
  "description",
  "pricePerDay",
  "imageSource",
];
const requiredEditableFields = editableFields;

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "PATCH") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  const { status } = await getAdminSession(request, response);

  if (status === 401) {
    return response.status(401).json({ message: "Authentication required" });
  }

  if (status === 403) {
    return response.status(403).json({ message: "Admin access required" });
  }

  const { id } = request.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid bike id" });
  }

  try {
    await dbConnect();

    if (request.method === "GET") {
      const bike = await Bike.findById(id);

      if (!bike) {
        return response.status(404).json({ message: "Bike not found" });
      }

      return response.status(200).json(bike);
    }

    const requestBody = request.body || {};
    const updateData = {};
    const fieldsToUpdate = Object.keys(requestBody);
    const hasInvalidField = fieldsToUpdate.some(
      (field) => !allowedFields.includes(field)
    );

    if (hasInvalidField) {
      return response.status(400).json({ message: "Invalid bike fields" });
    }

    if (fieldsToUpdate.length === 0) {
      return response.status(400).json({ message: "No bike fields provided" });
    }

    const hasEditableFields = fieldsToUpdate.some((field) =>
      editableFields.includes(field)
    );

    if (hasEditableFields) {
      const hasMissingRequiredField = requiredEditableFields.some((field) => {
        return !(field in requestBody) || !String(requestBody[field]).trim();
      });

      if (hasMissingRequiredField) {
        return response.status(400).json({
          message:
            "Name, brand, size, type, description, price per day and image source are required",
        });
      }
    }

    for (const field of stringFields) {
      if (field in requestBody) {
        if (typeof requestBody[field] !== "string") {
          return response.status(400).json({ message: "Invalid bike fields" });
        }

        const trimmedValue = requestBody[field].trim();

        if (requiredEditableFields.includes(field) && !trimmedValue) {
          return response.status(400).json({
            message:
              "Name, brand, size, type, description, price per day and image source are required",
          });
        }

        updateData[field] = trimmedValue;
      }
    }

    if ("pricePerDay" in requestBody) {
      const pricePerDay = Number(requestBody.pricePerDay);

      if (Number.isNaN(pricePerDay) || pricePerDay < 0) {
        return response.status(400).json({
          message: "Price per day must be a number greater than or equal to 0",
        });
      }

      updateData.pricePerDay = pricePerDay;
    }

    if ("isActive" in requestBody) {
      if (typeof requestBody.isActive !== "boolean") {
        return response.status(400).json({ message: "Invalid bike status" });
      }

      updateData.isActive = requestBody.isActive;
    }

    const updatedBike = await Bike.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBike) {
      return response.status(404).json({ message: "Bike not found" });
    }

    return response.status(200).json(updatedBike);
  } catch (error) {
    return response.status(500).json({
      message: "Bike could not be loaded or updated",
    });
  }
}
