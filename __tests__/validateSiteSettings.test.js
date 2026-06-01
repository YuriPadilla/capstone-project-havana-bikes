import { validateSiteSettings } from "@/utils/validateSiteSettings";

const validSettings = {
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
  pickupReturnInfo: "Pickup details will be coordinated after review.",
  depositInfo: "The deposit is returned when the bike is returned safely.",
};

describe("validateSiteSettings", () => {
  test("returns isValid true for valid settings", () => {
    const result = validateSiteSettings(validSettings);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.sanitizedSettings.hourlyPrice).toBe(4);
  });

  test("returns an error for negative hourlyPrice", () => {
    const result = validateSiteSettings({ ...validSettings, hourlyPrice: -1 });

    expect(result.isValid).toBe(false);
    expect(result.errors.hourlyPrice).toBe(
      "This field must be greater than or equal to 0."
    );
  });

  test("returns an error for negative firstDayPrice", () => {
    const result = validateSiteSettings({
      ...validSettings,
      firstDayPrice: -1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.firstDayPrice).toBe(
      "This field must be greater than or equal to 0."
    );
  });

  test("returns an error for negative additionalDayPrice", () => {
    const result = validateSiteSettings({
      ...validSettings,
      additionalDayPrice: -1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.additionalDayPrice).toBe(
      "This field must be greater than or equal to 0."
    );
  });

  test("returns an error for negative depositAmount", () => {
    const result = validateSiteSettings({
      ...validSettings,
      depositAmount: -1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.depositAmount).toBe(
      "This field must be greater than or equal to 0."
    );
  });

  test("returns an error for invalid email", () => {
    const result = validateSiteSettings({
      ...validSettings,
      email: "invalid-email",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Please enter a valid email address.");
  });

  test("allows empty email", () => {
    const result = validateSiteSettings({ ...validSettings, email: "" });

    expect(result.isValid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  test("returns an error for empty required fields", () => {
    const result = validateSiteSettings({
      ...validSettings,
      businessName: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.businessName).toBe("This field is required.");
  });

  test("returns trimmed strings in sanitizedSettings", () => {
    const result = validateSiteSettings({
      ...validSettings,
      businessName: "  Havana Bikes  ",
      email: "  info@example.com  ",
    });

    expect(result.sanitizedSettings.businessName).toBe("Havana Bikes");
    expect(result.sanitizedSettings.email).toBe("info@example.com");
  });
});
