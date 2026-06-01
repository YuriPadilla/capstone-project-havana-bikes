import { useSession } from "next-auth/react";
import useSWR from "swr";
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

const StyledStateMessage = styled.p`
  padding: var(--space-m);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  background: #ffffff;
  line-height: 1.5;
`;

const StyledErrorMessage = styled(StyledStateMessage)`
  border-color: #8f1d1d;
  color: #8f1d1d;
`;

const StyledSettingsGrid = styled.div`
  display: grid;
  gap: var(--space-m);
  margin-top: var(--space-m);
`;

const StyledSettingsSection = styled.section`
  display: grid;
  gap: var(--space-s);
  padding: var(--space-m);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  background: #ffffff;
`;

const StyledSectionTitle = styled.h4`
  margin: 0;
`;

const StyledSettingList = styled.dl`
  display: grid;
  gap: var(--space-s);
  margin: 0;

  @media (min-width: 768px) {
    grid-template-columns: max-content minmax(0, 1fr);
    column-gap: var(--space-m);
  }
`;

const StyledTerm = styled.dt`
  font-weight: 700;
`;

const StyledDescription = styled.dd`
  margin: 0;
  line-height: 1.5;
`;

const fetchSiteSettings = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Settings could not be loaded.");
  }

  return response.json();
};

function getSettingValue(value) {
  return value || "Not set";
}

function getPriceValue(settings, value) {
  if (value || value === 0) {
    return `${settings.currency || "$"}${value}`;
  }

  return "Not set";
}

export default function AdminSettingsPage() {
  const { status } = useSession();
  const {
    data: settings,
    error,
    isLoading,
  } = useSWR("/api/site-settings", fetchSiteSettings);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Business settings">
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
    <StandardSectionApp sectionTitle="Business settings">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          View the current business information used by Havana Bikes.
        </StyledText>

        {isLoading && (
          <StyledStateMessage>Loading business settings...</StyledStateMessage>
        )}
        {error && (
          <StyledErrorMessage>
            Business settings could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {settings && (
          <StyledSettingsGrid>
            <StyledSettingsSection>
              <StyledSectionTitle>General</StyledSectionTitle>
              <StyledSettingList>
                <StyledTerm>Business name</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.businessName)}
                </StyledDescription>
                <StyledTerm>Currency</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.currency)}
                </StyledDescription>
                <StyledTerm>Address</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.address)}
                </StyledDescription>
              </StyledSettingList>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Prices</StyledSectionTitle>
              <StyledSettingList>
                <StyledTerm>Hourly price</StyledTerm>
                <StyledDescription>
                  {getPriceValue(settings, settings.hourlyPrice)}
                </StyledDescription>
                <StyledTerm>First day price</StyledTerm>
                <StyledDescription>
                  {getPriceValue(settings, settings.firstDayPrice)}
                </StyledDescription>
                <StyledTerm>Additional day price</StyledTerm>
                <StyledDescription>
                  {getPriceValue(settings, settings.additionalDayPrice)}
                </StyledDescription>
                <StyledTerm>Deposit amount</StyledTerm>
                <StyledDescription>
                  {getPriceValue(settings, settings.depositAmount)}
                </StyledDescription>
              </StyledSettingList>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Contact</StyledSectionTitle>
              <StyledSettingList>
                <StyledTerm>Phone</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.phone)}
                </StyledDescription>
                <StyledTerm>WhatsApp</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.whatsapp)}
                </StyledDescription>
                <StyledTerm>Email</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.email)}
                </StyledDescription>
              </StyledSettingList>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Rental information</StyledSectionTitle>
              <StyledSettingList>
                <StyledTerm>Opening hours</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.openingHours)}
                </StyledDescription>
                <StyledTerm>Pickup information</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.pickupInfo)}
                </StyledDescription>
                <StyledTerm>Deposit information</StyledTerm>
                <StyledDescription>
                  {getSettingValue(settings.depositInfo)}
                </StyledDescription>
              </StyledSettingList>
            </StyledSettingsSection>
          </StyledSettingsGrid>
        )}
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
