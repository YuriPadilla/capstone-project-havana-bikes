import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { correctAdminVisit, trackVisit } from "@/utils/trackVisit";

export default function VisitTracker() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!router.isReady || status === "loading") {
      return;
    }

    if (session?.user?.role === "admin") {
      correctAdminVisit();
      return;
    }

    if (router.asPath.startsWith("/admin")) {
      return;
    }

    trackVisit();
  }, [router.asPath, router.isReady, session?.user?.role, status]);

  return null;
}
