import dbConnect from "@/db/connect";
import SiteSettings from "@/db/models/SiteSettings";
import { buildContactConfirmationEmail } from "@/utils/buildContactConfirmationEmail";
import { getSiteSettingsWithDefaults } from "@/utils/defaultSiteSettings";

export async function getContactConfirmationEmail({
  customerName,
  message,
}) {
  await dbConnect();

  const siteSettingsDocument = await SiteSettings.findOne();
  const siteSettings = getSiteSettingsWithDefaults(
    siteSettingsDocument?.toObject()
  );

  return buildContactConfirmationEmail({
    customerName,
    message,
    siteSettings,
  });
}
