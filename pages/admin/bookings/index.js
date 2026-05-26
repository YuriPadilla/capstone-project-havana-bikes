import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import AdminNavigation from "@/components/AdminNavigation";
import StandardSectionApp from "@/components/StandardSectionApp";

const StyledAdminWrapper = styled.div`
  max-width: 44rem;
  margin: 0 auto;
`;

const StyledText = styled.p`
  line-height: 1.5;
`;

const StyledAdminLink = styled(Link)`
  color: inherit;
`;

export default function AdminBookingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }

    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [router, session, status]);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin Bookings">
        <StyledAdminWrapper>
          <StyledText>Loading...</StyledText>
        </StyledAdminWrapper>
      </StandardSectionApp>
    );
  }

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return null;
  }

  return (
    <StandardSectionApp sectionTitle="Admin Bookings">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>Bookings management will be added here.</StyledText>
        <StyledAdminLink href="/admin">Back to admin dashboard</StyledAdminLink>
      </StyledAdminWrapper>
    </StandardSectionApp>
  );
}
