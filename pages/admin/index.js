import { useSession } from "next-auth/react";
import styled from "styled-components";
import AdminNavigation from "@/components/AdminNavigation";
import StandardSectionApp from "@/components/StandardSectionApp";
import { getAdminSession } from "@/utils/auth";

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

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin area">
        <StyledAdminWrapper>
          <StyledText>Loading...</StyledText>
        </StyledAdminWrapper>
      </StandardSectionApp>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <StandardSectionApp sectionTitle="Admin Dashboard">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          This area will be used to manage bookings and business tools for
          Havana Bikes.
        </StyledText>
        <StyledEmail>Logged in as: {session.user.email}</StyledEmail>
      </StyledAdminWrapper>
    </StandardSectionApp>
  );
}

export async function getServerSideProps({ req, res }) {
  const { status } = await getAdminSession(req, res);

  if (status === 401) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (status === 403) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
