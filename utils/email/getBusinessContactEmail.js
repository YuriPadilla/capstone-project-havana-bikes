import dbConnect from "../../db/connect";
import SiteSettings from "../../db/models/SiteSettings";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function getBusinessContactEmail() {
  await dbConnect();

  const siteSettings = await SiteSettings.findOne();
  const settingsEmail =
    typeof siteSettings?.email === "string" ? siteSettings.email.trim() : "";

  if (isValidEmail(settingsEmail)) {
    return settingsEmail;
  }

  const fallbackEmail =
    typeof process.env.BUSINESS_CONTACT_EMAIL === "string"
      ? process.env.BUSINESS_CONTACT_EMAIL.trim()
      : "";

  return isValidEmail(fallbackEmail) ? fallbackEmail : null;
}
