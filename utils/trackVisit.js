const VISIT_STORAGE_KEY = "havanaBikesVisitCounted";
const ADMIN_VISIT_CORRECTION_STORAGE_KEY =
  "havanaBikesAdminVisitCorrected";
let visitRequest;
let adminVisitCorrectionRequest;

export async function trackVisit() {
  if (typeof window === "undefined") {
    return;
  }

  if (window.sessionStorage.getItem(VISIT_STORAGE_KEY) === "true") {
    return;
  }

  if (!visitRequest) {
    visitRequest = fetch("/api/visits", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          window.sessionStorage.setItem(VISIT_STORAGE_KEY, "true");
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
  if (typeof window === "undefined") {
    return;
  }

  if (
    window.sessionStorage.getItem(VISIT_STORAGE_KEY) !== "true" ||
    window.sessionStorage.getItem(ADMIN_VISIT_CORRECTION_STORAGE_KEY) === "true"
  ) {
    return;
  }

  if (!adminVisitCorrectionRequest) {
    adminVisitCorrectionRequest = fetch("/api/visits/decrement", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          window.sessionStorage.setItem(
            ADMIN_VISIT_CORRECTION_STORAGE_KEY,
            "true"
          );
        }
      })
      .catch(() => {})
      .finally(() => {
        adminVisitCorrectionRequest = null;
      });
  }

  await adminVisitCorrectionRequest;
}
