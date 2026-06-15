const VISIT_STORAGE_KEY = "havanaBikesVisitCounted";
const ADMIN_VISIT_CORRECTION_STORAGE_KEY =
  "havanaBikesAdminVisitCorrected";
const TAB_ID_STORAGE_KEY = "havanaBikesTabId";
const ACTIVE_VISIT_TABS_STORAGE_KEY = "havanaBikesActiveVisitTabs";
const DEFAULT_ACTIVE_TAB_MAX_AGE = 120_000;
const ACTIVE_TAB_HEARTBEAT_INTERVAL = 10_000;
let visitRequest;
let adminVisitCorrectionRequest;
let activeTabHeartbeat;
let activeTabId;

export function isBrowser() {
  return typeof window !== "undefined";
}

export function readLocalStorageJson(key, fallbackValue = {}) {
  if (!isBrowser()) {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function writeLocalStorageJson(key, value) {
  if (!isBrowser()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeLocalStorageItem(key) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    return;
  }
}

function createTabId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getOrCreateTabId() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const existingTabId = window.sessionStorage.getItem(TAB_ID_STORAGE_KEY);

    if (existingTabId) {
      return existingTabId;
    }

    const tabId = createTabId();
    window.sessionStorage.setItem(TAB_ID_STORAGE_KEY, tabId);

    return tabId;
  } catch {
    return null;
  }
}

export function removeStaleVisitTabs(
  activeTabs,
  maxAge = DEFAULT_ACTIVE_TAB_MAX_AGE,
  currentTime = Date.now()
) {
  if (!activeTabs || typeof activeTabs !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(activeTabs).filter(([tabId, tab]) => {
      return (
        tab &&
        typeof tab === "object" &&
        tab.tabId === tabId &&
        typeof tab.updatedAt === "number" &&
        currentTime - tab.updatedAt <= maxAge
      );
    })
  );
}

export function getActiveVisitTabs(
  maxAge = DEFAULT_ACTIVE_TAB_MAX_AGE,
  currentTime = Date.now()
) {
  const storedTabs = readLocalStorageJson(ACTIVE_VISIT_TABS_STORAGE_KEY);
  const activeTabs =
    storedTabs && typeof storedTabs === "object" && !Array.isArray(storedTabs)
      ? storedTabs
      : {};
  const currentTabs = removeStaleVisitTabs(activeTabs, maxAge, currentTime);

  if (Object.keys(currentTabs).length !== Object.keys(activeTabs).length) {
    writeLocalStorageJson(ACTIVE_VISIT_TABS_STORAGE_KEY, currentTabs);
  }

  return currentTabs;
}

function registerActiveVisitTab(tabId, activeTabs, updatedAt = Date.now()) {
  const nextActiveTabs = {
    ...activeTabs,
    [tabId]: {
      tabId,
      updatedAt,
    },
  };

  writeLocalStorageJson(ACTIVE_VISIT_TABS_STORAGE_KEY, nextActiveTabs);
}

function removeActiveVisitTab(tabId) {
  const activeTabs = getActiveVisitTabs();

  if (!activeTabs[tabId]) {
    return Object.keys(activeTabs).length;
  }

  const nextActiveTabs = { ...activeTabs };
  delete nextActiveTabs[tabId];
  writeLocalStorageJson(ACTIVE_VISIT_TABS_STORAGE_KEY, nextActiveTabs);

  return Object.keys(nextActiveTabs).length;
}

function updateActiveVisitTab() {
  if (!activeTabId) {
    return;
  }

  registerActiveVisitTab(activeTabId, getActiveVisitTabs());
}

export function stopVisitTabActivity({ preserveSharedState = false } = {}) {
  if (!isBrowser() || !activeTabId) {
    return;
  }

  window.clearInterval(activeTabHeartbeat);
  window.removeEventListener("pagehide", stopVisitTabActivity);
  const remainingActiveTabs = removeActiveVisitTab(activeTabId);

  if (remainingActiveTabs === 0 && !preserveSharedState) {
    resetSharedVisitState();
  }

  activeTabHeartbeat = null;
  activeTabId = null;
}

function startVisitTabActivity(tabId) {
  if (activeTabId === tabId) {
    return;
  }

  stopVisitTabActivity();
  activeTabId = tabId;
  window.addEventListener("pagehide", stopVisitTabActivity);
  activeTabHeartbeat = window.setInterval(
    updateActiveVisitTab,
    ACTIVE_TAB_HEARTBEAT_INTERVAL
  );
}

function resetSharedVisitState() {
  removeLocalStorageItem(VISIT_STORAGE_KEY);
  removeLocalStorageItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY);
}

export async function trackVisit() {
  if (!isBrowser()) {
    return;
  }

  const tabId = getOrCreateTabId();

  if (!tabId) {
    return;
  }

  const activeTabs = getActiveVisitTabs();
  const hasActiveVisitTab = Object.keys(activeTabs).length > 0;
  const visitWasCountedInThisTab =
    window.sessionStorage.getItem(VISIT_STORAGE_KEY) === "true";

  if (!hasActiveVisitTab && !visitWasCountedInThisTab) {
    resetSharedVisitState();
  }

  registerActiveVisitTab(tabId, activeTabs);
  startVisitTabActivity(tabId);

  if (visitWasCountedInThisTab) {
    window.localStorage.setItem(VISIT_STORAGE_KEY, "true");
    return;
  }

  if (hasActiveVisitTab) {
    window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
    return;
  }

  if (!visitRequest) {
    visitRequest = fetch("/api/visits", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
          window.localStorage.setItem(VISIT_STORAGE_KEY, "true");
        }
      })
      .catch(() => {})
      .finally(() => {
        visitRequest = null;
      });
  }

  await visitRequest;
}

export async function correctAdminVisit() {
  if (!isBrowser()) {
    return;
  }

  const activeTabs = getActiveVisitTabs();

  if (Object.keys(activeTabs).length === 0) {
    resetSharedVisitState();
    return;
  }

  const visitWasCounted =
    window.localStorage.getItem(VISIT_STORAGE_KEY) === "true";
  const correctionStatus = window.localStorage.getItem(
    ADMIN_VISIT_CORRECTION_STORAGE_KEY
  );

  if (
    !visitWasCounted ||
    correctionStatus === "pending" ||
    correctionStatus === "true"
  ) {
    stopVisitTabActivity({ preserveSharedState: true });
    return;
  }

  if (!adminVisitCorrectionRequest) {
    window.localStorage.setItem(
      ADMIN_VISIT_CORRECTION_STORAGE_KEY,
      "pending"
    );
    stopVisitTabActivity({ preserveSharedState: true });

    adminVisitCorrectionRequest = fetch("/api/visits/decrement", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          window.localStorage.setItem(
            ADMIN_VISIT_CORRECTION_STORAGE_KEY,
            "true"
          );
          window.sessionStorage.setItem(
            ADMIN_VISIT_CORRECTION_STORAGE_KEY,
            "true"
          );
          return;
        }

        removeLocalStorageItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY);
      })
      .catch(() => {
        removeLocalStorageItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY);
      })
      .finally(() => {
        adminVisitCorrectionRequest = null;
      });
  }

  await adminVisitCorrectionRequest;
}
