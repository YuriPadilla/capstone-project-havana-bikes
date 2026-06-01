import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

const StyledSuccessMessage = styled(StyledStateMessage)`
  border-color: #2c6b3f;
  color: #2c6b3f;
`;

const StyledForm = styled.form`
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

const StyledFieldGrid = styled.div`
  display: grid;
  gap: var(--space-m);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledField = styled.label`
  display: grid;
  gap: var(--space-xs);
  font-weight: 700;
`;

const StyledInput = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: var(--space-s);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  font: inherit;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 7rem;
  padding: var(--space-s);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  font: inherit;
  resize: vertical;
`;

const StyledSubmitButton = styled.button`
  width: fit-content;
  min-height: 2.75rem;
  padding: var(--space-s) var(--space-m);
  border: none;
  border-radius: var(--radius-s);
  background: var(--color-primary);
  color: var(--color-surface);
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

const fetchSiteSettings = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Settings could not be loaded.");
  }

  return response.json();
};

const initialFormValues = {
  businessName: "",
  currency: "",
  hourlyPrice: "",
  firstDayPrice: "",
  additionalDayPrice: "",
  depositAmount: "",
  openingHours: "",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  pickupReturnInfo: "",
  depositInfo: "",
};

const numberFields = [
  "hourlyPrice",
  "firstDayPrice",
  "additionalDayPrice",
  "depositAmount",
];

async function getErrorMessage(response) {
  try {
    const errorData = await response.json();

    return (
      errorData.message ||
      errorData.error ||
      "Business settings could not be saved. Please try again."
    );
  } catch (error) {
    return "Business settings could not be saved. Please try again.";
  }
}

export default function AdminSettingsPage() {
  const { status } = useSession();
  const {
    data: settings,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/site-settings", fetchSiteSettings);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!settings) {
      return;
    }

    setFormValues({
      businessName: settings.businessName || "",
      currency: settings.currency || "",
      hourlyPrice: settings.hourlyPrice ?? "",
      firstDayPrice: settings.firstDayPrice ?? "",
      additionalDayPrice: settings.additionalDayPrice ?? "",
      depositAmount: settings.depositAmount ?? "",
      openingHours: settings.openingHours || "",
      address: settings.address || "",
      phone: settings.phone || "",
      whatsapp: settings.whatsapp || "",
      email: settings.email || "",
      pickupReturnInfo: settings.pickupInfo || settings.pickupReturnInfo || "",
      depositInfo: settings.depositInfo || "",
    });
  }, [settings]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function validateNumberFields() {
    for (const field of numberFields) {
      const value = Number(formValues[field]);

      if (Number.isNaN(value) || value < 0) {
        return "Price and deposit values must be numbers greater than or equal to 0";
      }
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    const validationError = validateNumberFields();

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSaving(true);

    const payload = {
      businessName: formValues.businessName.trim(),
      currency: formValues.currency.trim(),
      hourlyPrice: Number(formValues.hourlyPrice),
      firstDayPrice: Number(formValues.firstDayPrice),
      additionalDayPrice: Number(formValues.additionalDayPrice),
      depositAmount: Number(formValues.depositAmount),
      openingHours: formValues.openingHours.trim(),
      address: formValues.address.trim(),
      phone: formValues.phone.trim(),
      whatsapp: formValues.whatsapp.trim(),
      email: formValues.email.trim(),
      pickupReturnInfo: formValues.pickupReturnInfo.trim(),
      depositInfo: formValues.depositInfo.trim(),
    };

    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setSubmitError(errorMessage);
        return;
      }

      const updatedSettings = await response.json();

      await mutate(updatedSettings, false);
      setSuccessMessage("Business settings saved successfully.");
    } catch (error) {
      setSubmitError("Business settings could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

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
          Review and update the current business information used by Havana
          Bikes.
        </StyledText>

        {isLoading && (
          <StyledStateMessage>Loading business settings...</StyledStateMessage>
        )}
        {error && (
          <StyledErrorMessage>
            Business settings could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {submitError && <StyledErrorMessage>{submitError}</StyledErrorMessage>}
        {successMessage && (
          <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
        )}
        {settings && (
          <StyledForm onSubmit={handleSubmit}>
            <StyledSettingsSection>
              <StyledSectionTitle>General</StyledSectionTitle>
              <StyledFieldGrid>
                <StyledField>
                  Business name
                  <StyledInput
                    type="text"
                    name="businessName"
                    value={formValues.businessName}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  Currency
                  <StyledInput
                    type="text"
                    name="currency"
                    value={formValues.currency}
                    onChange={handleChange}
                  />
                </StyledField>
              </StyledFieldGrid>
              <StyledField>
                Address
                <StyledTextarea
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                />
              </StyledField>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Prices</StyledSectionTitle>
              <StyledFieldGrid>
                <StyledField>
                  Hourly price
                  <StyledInput
                    type="number"
                    name="hourlyPrice"
                    min="0"
                    value={formValues.hourlyPrice}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  First day price
                  <StyledInput
                    type="number"
                    name="firstDayPrice"
                    min="0"
                    value={formValues.firstDayPrice}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  Additional day price
                  <StyledInput
                    type="number"
                    name="additionalDayPrice"
                    min="0"
                    value={formValues.additionalDayPrice}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  Deposit amount
                  <StyledInput
                    type="number"
                    name="depositAmount"
                    min="0"
                    value={formValues.depositAmount}
                    onChange={handleChange}
                  />
                </StyledField>
              </StyledFieldGrid>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Contact</StyledSectionTitle>
              <StyledFieldGrid>
                <StyledField>
                  Phone
                  <StyledInput
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  WhatsApp
                  <StyledInput
                    type="tel"
                    name="whatsapp"
                    value={formValues.whatsapp}
                    onChange={handleChange}
                  />
                </StyledField>
                <StyledField>
                  Email
                  <StyledInput
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </StyledField>
              </StyledFieldGrid>
            </StyledSettingsSection>

            <StyledSettingsSection>
              <StyledSectionTitle>Rental information</StyledSectionTitle>
              <StyledField>
                Opening hours
                <StyledTextarea
                  name="openingHours"
                  value={formValues.openingHours}
                  onChange={handleChange}
                />
              </StyledField>
              <StyledField>
                Pickup information
                <StyledTextarea
                  name="pickupReturnInfo"
                  value={formValues.pickupReturnInfo}
                  onChange={handleChange}
                />
              </StyledField>
              <StyledField>
                Deposit information
                <StyledTextarea
                  name="depositInfo"
                  value={formValues.depositInfo}
                  onChange={handleChange}
                />
              </StyledField>
            </StyledSettingsSection>
            <StyledSubmitButton type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save business settings"}
            </StyledSubmitButton>
          </StyledForm>
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
