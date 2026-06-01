import dbConnect from "../../../db/connect";
import SiteSettings from "../../../db/models/SiteSettings";

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

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const siteSettings = await SiteSettings.findOne();

    if (siteSettings) {
      return response.status(200).json(siteSettings);
    }

    return response.status(200).json(defaultSettings);
  }

  return response.status(405).json({ status: "Method Not Allowed" });
}
