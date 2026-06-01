export const defaultSiteSettings = {
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
  pickupReturnInfo:
    "Pickup and return details will be coordinated after your booking request is reviewed.",
  depositInfo:
    "The deposit is returned at the end of the rental when the bike is returned in good condition.",
};

const requiredStringFields = [
  "businessName",
  "currency",
  "openingHours",
  "address",
  "pickupReturnInfo",
  "depositInfo",
];

const numberFields = [
  "hourlyPrice",
  "firstDayPrice",
  "additionalDayPrice",
  "depositAmount",
];

export function getSiteSettingsWithDefaults(settings) {
  if (!settings || Object.keys(settings).length === 0) {
    return defaultSiteSettings;
  }

  const safeSettings = {
    ...defaultSiteSettings,
    ...settings,
    pickupReturnInfo:
      settings.pickupReturnInfo ||
      settings.pickupInfo ||
      defaultSiteSettings.pickupReturnInfo,
  };

  requiredStringFields.forEach((field) => {
    if (
      typeof safeSettings[field] !== "string" ||
      safeSettings[field].trim() === ""
    ) {
      safeSettings[field] = defaultSiteSettings[field];
      return;
    }

    safeSettings[field] = safeSettings[field].trim();
  });

  numberFields.forEach((field) => {
    const value = Number(safeSettings[field]);

    if (Number.isNaN(value) || value < 0) {
      safeSettings[field] = defaultSiteSettings[field];
      return;
    }

    safeSettings[field] = value;
  });

  return safeSettings;
}
