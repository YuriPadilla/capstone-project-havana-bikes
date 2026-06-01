import useSWR from "swr";

const fallbackSiteSettings = {
  businessName: "Havana Bikes",
  address: "La Habana, Cuba",
  phone: "",
  whatsapp: "",
  email: "",
  openingHours: "Monday - Sunday, 8:00 AM - 8:00 PM",
  currency: "$",
  hourlyPrice: 4,
  firstDayPrice: 15,
  additionalDayPrice: 10,
  depositAmount: 50,
  depositInfo:
    "The deposit is returned at the end of the rental when the bike is returned in good condition.",
  pickupReturnInfo:
    "Pickup and return details will be coordinated after your booking request is reviewed.",
};

export default function useSiteSettings() {
  const { data, error, isLoading } = useSWR("/api/site-settings");
  const siteSettings = data?.settings || data || {};

  const settings = {
    ...fallbackSiteSettings,
    ...siteSettings,
    pickupReturnInfo:
      siteSettings.pickupReturnInfo ||
      siteSettings.pickupInfo ||
      fallbackSiteSettings.pickupReturnInfo,
  };

  return {
    settings,
    isLoading,
    error,
  };
}
