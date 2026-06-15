import {
  correctAdminVisit,
  stopVisitTabActivity,
  trackVisit,
} from "@/utils/trackVisit";

const VISIT_STORAGE_KEY = "havanaBikesVisitCounted";
const ADMIN_VISIT_CORRECTION_STORAGE_KEY =
  "havanaBikesAdminVisitCorrected";
const TAB_ID_STORAGE_KEY = "havanaBikesTabId";
const ACTIVE_VISIT_TABS_STORAGE_KEY = "havanaBikesActiveVisitTabs";
const originalFetch = global.fetch;

function setActiveTabs(activeTabs) {
  window.localStorage.setItem(
    ACTIVE_VISIT_TABS_STORAGE_KEY,
    JSON.stringify(activeTabs)
  );
}

function setCountedActiveVisit() {
  window.localStorage.setItem(VISIT_STORAGE_KEY, "true");
  setActiveTabs({
    "public-tab": {
      tabId: "public-tab",
      updatedAt: Date.now(),
    },
  });
}

describe("visit tracking", () => {
  beforeEach(() => {
    stopVisitTabActivity();
    window.sessionStorage.clear();
    window.localStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterAll(() => {
    stopVisitTabActivity();
    global.fetch = originalFetch;
  });

  test("trackVisit posts a visit when there are no active tabs", async () => {
    window.sessionStorage.setItem(TAB_ID_STORAGE_KEY, "first-tab");

    await trackVisit();

    expect(global.fetch).toHaveBeenCalledWith("/api/visits", {
      method: "POST",
    });
    expect(window.sessionStorage.getItem(VISIT_STORAGE_KEY)).toBe("true");
  });

  test("trackVisit does not post again when the same tab is already registered", async () => {
    window.sessionStorage.setItem(TAB_ID_STORAGE_KEY, "first-tab");

    await trackVisit();
    global.fetch.mockClear();
    await trackVisit();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("trackVisit does not post when another active tab exists", async () => {
    window.sessionStorage.setItem(TAB_ID_STORAGE_KEY, "second-tab");
    setActiveTabs({
      "first-tab": {
        tabId: "first-tab",
        updatedAt: Date.now(),
      },
    });

    await trackVisit();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem(VISIT_STORAGE_KEY)).toBe("true");
  });

  test("trackVisit removes expired tabs and posts a new visit", async () => {
    window.sessionStorage.setItem(TAB_ID_STORAGE_KEY, "new-tab");
    setActiveTabs({
      "expired-tab": {
        tabId: "expired-tab",
        updatedAt: Date.now() - 121_000,
      },
    });

    await trackVisit();

    const activeTabs = JSON.parse(
      window.localStorage.getItem(ACTIVE_VISIT_TABS_STORAGE_KEY)
    );

    expect(global.fetch).toHaveBeenCalledWith("/api/visits", {
      method: "POST",
    });
    expect(activeTabs["expired-tab"]).toBeUndefined();
    expect(activeTabs["new-tab"]).toEqual({
      tabId: "new-tab",
      updatedAt: expect.any(Number),
    });
  });

  test("correctAdminVisit does nothing when no visit was counted", async () => {
    setActiveTabs({
      "public-tab": {
        tabId: "public-tab",
        updatedAt: Date.now(),
      },
    });

    await correctAdminVisit();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("correctAdminVisit posts a decrement for a counted visit pending correction", async () => {
    setCountedActiveVisit();

    await correctAdminVisit();

    expect(global.fetch).toHaveBeenCalledWith("/api/visits/decrement", {
      method: "POST",
    });
  });

  test("correctAdminVisit does not decrement twice for the same active visit", async () => {
    setCountedActiveVisit();

    await correctAdminVisit();
    await correctAdminVisit();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(
      window.sessionStorage.getItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY)
    ).toBe("true");
    expect(
      window.localStorage.getItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY)
    ).toBe("true");
  });
});
