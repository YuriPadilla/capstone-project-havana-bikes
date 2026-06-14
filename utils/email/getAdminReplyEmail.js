import SiteSettings from "../../db/models/SiteSettings";
import { getSiteSettingsWithDefaults } from "@/utils/defaultSiteSettings";

export async function getAdminReplyEmail({ customerName, message }) {
  const siteSettingsDocument = await SiteSettings.findOne();
  const siteSettings = getSiteSettingsWithDefaults(
    siteSettingsDocument?.toObject()
  );
  const contactLines = [
    siteSettings.email && `Email: ${siteSettings.email}`,
    siteSettings.phone && `Phone: ${siteSettings.phone}`,
    siteSettings.whatsapp && `WhatsApp: ${siteSettings.whatsapp}`,
    siteSettings.address && `Address: ${siteSettings.address}`,
  ].filter(Boolean);
  const textSections = [
    `Hello ${customerName},`,
    message,
    `Best regards,\n${siteSettings.businessName}`,
  ];

  if (contactLines.length > 0) {
    textSections.push(contactLines.join("\n"));
  }

  return {
    subject: `Reply from ${siteSettings.businessName}`,
    text: textSections.join("\n\n"),
  };
}
