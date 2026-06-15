import { correctAdminVisit, trackVisit } from "@/utils/trackVisit";

const VISIT_STORAGE_KEY = "havanaBikesVisitCounted";
const ADMIN_VISIT_CORRECTION_STORAGE_KEY =
  "havanaBikesAdminVisitCorrected";
const originalFetch = global.fetch;

describe("visit tracking", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test("trackVisit does nothing when the visit was already counted", async () => {
    window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");

    await trackVisit();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("trackVisit posts a visit when it has not been counted", async () => {
    await trackVisit();

    expect(global.fetch).toHaveBeenCalledWith("/api/visits", {
      method: "POST",
    });
    expect(window.sessionStorage.getItem(VISIT_STORAGE_KEY)).toBe("true");
  });

  test("correctAdminVisit does nothing when no visit was counted", async () => {
    await correctAdminVisit();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("correctAdminVisit does nothing when the visit was already corrected", async () => {
    window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
    window.sessionStorage.setItem(
      ADMIN_VISIT_CORRECTION_STORAGE_KEY,
      "true"
    );

    await correctAdminVisit();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("correctAdminVisit posts a decrement for an uncorrected visit", async () => {
    window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");

    await correctAdminVisit();

    expect(global.fetch).toHaveBeenCalledWith("/api/visits/decrement", {
      method: "POST",
    });
  });

  test("correctAdminVisit marks a successful correction in sessionStorage", async () => {
    window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");

    await correctAdminVisit();

    expect(
      window.sessionStorage.getItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY)
    ).toBe("true");
  });
});
