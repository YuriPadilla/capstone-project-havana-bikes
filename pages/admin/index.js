import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledButton } from "@/components/Button/Button.styled";
import StandardSectionApp from "@/components/StandardSectionApp";

const StyledAdminWrapper = styled.div`
  max-width: 44rem;
  margin: 0 auto;
`;

const StyledText = styled.p`
  line-height: 1.5;
`;

const StyledEmail = styled.p`
  font-weight: 700;
`;

const StyledActions = styled.div`
  margin-top: var(--space-l);
`;

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin area">
        <StyledAdminWrapper>
          <StyledText>Loading...</StyledText>
        </StyledAdminWrapper>
      </StandardSectionApp>
    );
  }

  if (status === "authenticated" && session?.user?.role !== "admin") {
    return (
      <StandardSectionApp sectionTitle="Admin area">
        <StyledAdminWrapper>
          <StyledText>Access denied.</StyledText>
        </StyledAdminWrapper>
      </StandardSectionApp>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <StandardSectionApp sectionTitle="Admin area">
      <StyledAdminWrapper>
        <StyledText>
          Reservation management will be added here later.
        </StyledText>
        <StyledEmail>Logged in as: {session.user.email}</StyledEmail>
        <StyledActions>
          <StyledButton
            type="button"
            disabled={false}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Log out
          </StyledButton>
        </StyledActions>
      </StyledAdminWrapper>
    </StandardSectionApp>
  );
}
