import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import AdminNavigation from "@/components/AdminNavigation";
import StandardSectionApp from "@/components/StandardSectionApp";
import { getAdminSession } from "@/utils/auth";
import { getSiteSettingsWithDefaults } from "@/utils/defaultSiteSettings";
import { validateSiteSettings } from "@/utils/validateSiteSettings";

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

const StyledFieldError = styled.span`
  color: #8f1d1d;
  font-size: 0.9rem;
  font-weight: 400;
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
  ...getSiteSettingsWithDefaults(),
};

async function getErrorDetails(response) {
  try {
    const errorData = await response.json();

    return {
      message:
        errorData.message ||
        errorData.error ||
        "Business settings could not be saved. Please try again.",
      errors: errorData.errors || {},
    };
  } catch (error) {
    return {
      message: "Business settings could not be saved. Please try again.",
      errors: {},
    };
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!settings) {
      return;
    }

    setFormValues(getSiteSettingsWithDefaults(settings));
  }, [settings]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setFieldErrors({});
    setSuccessMessage("");

    const { isValid, errors, sanitizedSettings } =
      validateSiteSettings(formValues);

    if (!isValid) {
      setFieldErrors(errors);
      setSubmitError("Please check the business settings form.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedSettings),
      });

      if (!response.ok) {
        const { message, errors } = await getErrorDetails(response);
        setSubmitError(message);
        setFieldErrors(errors);
        return;
      }

      const updatedSettings = await response.json();

      await mutate(updatedSettings, false);
      setFormValues(getSiteSettingsWithDefaults(updatedSettings));
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
                  {fieldErrors.businessName && (
                    <StyledFieldError>
                      {fieldErrors.businessName}
                    </StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  Currency
                  <StyledInput
                    type="text"
                    name="currency"
                    value={formValues.currency}
                    onChange={handleChange}
                  />
                  {fieldErrors.currency && (
                    <StyledFieldError>{fieldErrors.currency}</StyledFieldError>
                  )}
                </StyledField>
              </StyledFieldGrid>
              <StyledField>
                Address
                <StyledTextarea
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                />
                {fieldErrors.address && (
                  <StyledFieldError>{fieldErrors.address}</StyledFieldError>
                )}
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
                    step="0.01"
                    value={formValues.hourlyPrice}
                    onChange={handleChange}
                  />
                  {fieldErrors.hourlyPrice && (
                    <StyledFieldError>
                      {fieldErrors.hourlyPrice}
                    </StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  First day price
                  <StyledInput
                    type="number"
                    name="firstDayPrice"
                    min="0"
                    step="0.01"
                    value={formValues.firstDayPrice}
                    onChange={handleChange}
                  />
                  {fieldErrors.firstDayPrice && (
                    <StyledFieldError>
                      {fieldErrors.firstDayPrice}
                    </StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  Additional day price
                  <StyledInput
                    type="number"
                    name="additionalDayPrice"
                    min="0"
                    step="0.01"
                    value={formValues.additionalDayPrice}
                    onChange={handleChange}
                  />
                  {fieldErrors.additionalDayPrice && (
                    <StyledFieldError>
                      {fieldErrors.additionalDayPrice}
                    </StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  Deposit amount
                  <StyledInput
                    type="number"
                    name="depositAmount"
                    min="0"
                    step="0.01"
                    value={formValues.depositAmount}
                    onChange={handleChange}
                  />
                  {fieldErrors.depositAmount && (
                    <StyledFieldError>
                      {fieldErrors.depositAmount}
                    </StyledFieldError>
                  )}
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
                  {fieldErrors.phone && (
                    <StyledFieldError>{fieldErrors.phone}</StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  WhatsApp
                  <StyledInput
                    type="tel"
                    name="whatsapp"
                    value={formValues.whatsapp}
                    onChange={handleChange}
                  />
                  {fieldErrors.whatsapp && (
                    <StyledFieldError>{fieldErrors.whatsapp}</StyledFieldError>
                  )}
                </StyledField>
                <StyledField>
                  Email
                  <StyledInput
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && (
                    <StyledFieldError>{fieldErrors.email}</StyledFieldError>
                  )}
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
                {fieldErrors.openingHours && (
                  <StyledFieldError>
                    {fieldErrors.openingHours}
                  </StyledFieldError>
                )}
              </StyledField>
              <StyledField>
                Pickup information
                <StyledTextarea
                  name="pickupReturnInfo"
                  value={formValues.pickupReturnInfo}
                  onChange={handleChange}
                />
                {fieldErrors.pickupReturnInfo && (
                  <StyledFieldError>
                    {fieldErrors.pickupReturnInfo}
                  </StyledFieldError>
                )}
              </StyledField>
              <StyledField>
                Deposit information
                <StyledTextarea
                  name="depositInfo"
                  value={formValues.depositInfo}
                  onChange={handleChange}
                />
                {fieldErrors.depositInfo && (
                  <StyledFieldError>{fieldErrors.depositInfo}</StyledFieldError>
                )}
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
