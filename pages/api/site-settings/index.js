import dbConnect from "../../../db/connect";
import SiteSettings from "../../../db/models/SiteSettings";
import { getAdminSession } from "@/utils/auth";
import {
  defaultSiteSettings,
  getSiteSettingsWithDefaults,
} from "@/utils/defaultSiteSettings";
import { validateSiteSettings } from "@/utils/validateSiteSettings";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const siteSettings = await SiteSettings.findOne();
    const safeSettings = getSiteSettingsWithDefaults(siteSettings?.toObject());

    return response.status(200).json(safeSettings);
  }

  if (request.method === "PUT") {
    const { status } = await getAdminSession(request, response);

    if (status === 401) {
      return response.status(401).json({ message: "Authentication required" });
    }

    if (status === 403) {
      return response.status(403).json({ message: "Admin access required" });
    }

    const { isValid, errors, sanitizedSettings } = validateSiteSettings(
      request.body || {}
    );

    if (!isValid) {
      return response.status(400).json({
        message: "Please check the business settings form.",
        errors,
      });
    }

    try {
      const existingSettings = await SiteSettings.findOne();
      const settingsData = {
        ...sanitizedSettings,
        pickupInfo: sanitizedSettings.pickupReturnInfo,
      };
      delete settingsData.pickupReturnInfo;

      if (!existingSettings) {
        const newSettings = await SiteSettings.create({
          ...defaultSiteSettings,
          ...settingsData,
        });
        const safeSettings = getSiteSettingsWithDefaults(
          newSettings.toObject()
        );

        return response.status(200).json(safeSettings);
      }

      const updatedSettings = await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        { $set: settingsData },
        { new: true }
      );
      const safeSettings = getSiteSettingsWithDefaults(
        updatedSettings.toObject()
      );

      return response.status(200).json(safeSettings);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Settings could not be updated" });
    }
  }

  return response.status(405).json({ status: "Method Not Allowed" });
}
