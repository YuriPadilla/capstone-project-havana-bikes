import {
  defaultSiteSettings,
  getSiteSettingsWithDefaults,
} from "@/utils/defaultSiteSettings";

describe("getSiteSettingsWithDefaults", () => {
  test("returns defaults when settings are missing", () => {
    expect(getSiteSettingsWithDefaults()).toEqual(defaultSiteSettings);
    expect(getSiteSettingsWithDefaults(null)).toEqual(defaultSiteSettings);
    expect(getSiteSettingsWithDefaults({})).toEqual(defaultSiteSettings);
  });

  test("fills incomplete settings with defaults", () => {
    expect(
      getSiteSettingsWithDefaults({
        businessName: "Custom Bikes",
        hourlyPrice: 6,
      })
    ).toEqual({
      ...defaultSiteSettings,
      businessName: "Custom Bikes",
      hourlyPrice: 6,
    });
  });

  test("uses pickupInfo as fallback for pickupReturnInfo", () => {
    expect(
      getSiteSettingsWithDefaults({
        pickupInfo: "Meet us at the shop.",
      }).pickupReturnInfo
    ).toBe("Meet us at the shop.");
  });
});
