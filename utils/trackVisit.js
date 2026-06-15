const VISIT_STORAGE_KEY = "havanaBikesVisitCounted";
let visitRequest;

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
