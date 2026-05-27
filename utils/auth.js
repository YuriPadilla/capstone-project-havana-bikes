import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getAdminSession(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return { session: null, status: 401 };
  }

  if (session.user?.role !== "admin") {
    return { session: null, status: 403 };
  }

  return { session, status: 200 };
}
