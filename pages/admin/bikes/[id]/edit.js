import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
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

const StyledForm = styled.form`
  display: grid;
  gap: var(--space-m);
  margin-top: var(--space-m);
`;

const StyledField = styled.label`
  display: grid;
  gap: var(--space-xs);
  font-weight: 600;
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
  min-height: 8rem;
  padding: var(--space-s);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  font: inherit;
  resize: vertical;
`;

const StyledFieldError = styled.span`
  color: #8f1d1d;
  font-size: 0.9rem;
  font-weight: 400;
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
`;

const StyledBackLink = styled(Link)`
  display: inline-flex;
  width: fit-content;
  margin-top: var(--space-m);
  color: inherit;
  font-weight: 600;
`;

const fetchAdminBike = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

const initialFormValues = {
  name: "",
  brand: "",
  size: "",
  type: "",
  description: "",
  pricePerDay: "",
  imageSource: "",
};

async function getErrorMessage(response) {
  try {
    const errorData = await response.json();

    return (
      errorData.message || errorData.error || "Bike could not be updated."
    );
  } catch (error) {
    return "Bike could not be updated.";
  }
}

export default function AdminEditBikePage() {
  const { status } = useSession();
  const router = useRouter();
  const { mutate: mutateGlobal } = useSWRConfig();
  const { id } = router.query;
  const {
    data: bike,
    error,
    isLoading,
    mutate: mutateBike,
  } = useSWR(id ? `/api/admin/bikes/${id}` : null, fetchAdminBike);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!bike) {
      return;
    }

    setFormValues({
      name: bike.name || "",
      brand: bike.brand || "",
      size: bike.size || "",
      type: bike.type || "",
      description: bike.description || "",
      pricePerDay: bike.pricePerDay ?? "",
      imageSource: bike.imageSource || "",
    });
  }, [bike]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function validateForm() {
    const errors = {};
    const requiredFields = [
      "name",
      "brand",
      "size",
      "type",
      "description",
      "pricePerDay",
      "imageSource",
    ];

    for (const field of requiredFields) {
      if (!String(formValues[field]).trim()) {
        errors[field] = "This field is required.";
      }
    }

    const pricePerDay = Number(formValues.pricePerDay);

    if (
      !errors.pricePerDay &&
      (Number.isNaN(pricePerDay) || pricePerDay < 0)
    ) {
      errors.pricePerDay =
        "Price per day must be a number greater than or equal to 0.";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSaving(true);

    const bikePayload = {
      name: formValues.name.trim(),
      brand: formValues.brand.trim(),
      size: formValues.size.trim(),
      type: formValues.type.trim(),
      description: formValues.description.trim(),
      pricePerDay: Number(formValues.pricePerDay),
      imageSource: formValues.imageSource.trim(),
    };

    try {
      const response = await fetch(`/api/admin/bikes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bikePayload),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setSubmitError(errorMessage);
        return;
      }

      const updatedBike = await response.json();
      await mutateBike(updatedBike, false);
      await mutateGlobal("/api/admin/bikes");
      await router.push("/admin/bikes");
    } catch (error) {
      setSubmitError("Bike could not be updated. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Edit bike">
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
    <StandardSectionApp sectionTitle="Edit bike">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          Update the public details used for this bike in the rental catalog.
        </StyledText>

        {isLoading && <StyledStateMessage>Loading bike...</StyledStateMessage>}
        {error && (
          <StyledErrorMessage>
            {error.message || "Bike could not be loaded. Please try again later."}
          </StyledErrorMessage>
        )}
        {submitError && <StyledErrorMessage>{submitError}</StyledErrorMessage>}
        {bike && (
          <StyledForm onSubmit={handleSubmit}>
            <StyledField>
              Name
              <StyledInput
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <StyledFieldError>{formErrors.name}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Brand
              <StyledInput
                type="text"
                name="brand"
                value={formValues.brand}
                onChange={handleChange}
              />
              {formErrors.brand && (
                <StyledFieldError>{formErrors.brand}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Size
              <StyledInput
                type="text"
                name="size"
                value={formValues.size}
                onChange={handleChange}
              />
              {formErrors.size && (
                <StyledFieldError>{formErrors.size}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Type
              <StyledInput
                type="text"
                name="type"
                value={formValues.type}
                onChange={handleChange}
              />
              {formErrors.type && (
                <StyledFieldError>{formErrors.type}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Description
              <StyledTextarea
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
              {formErrors.description && (
                <StyledFieldError>{formErrors.description}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Price per day
              <StyledInput
                type="number"
                name="pricePerDay"
                min="0"
                step="1"
                value={formValues.pricePerDay}
                onChange={handleChange}
              />
              {formErrors.pricePerDay && (
                <StyledFieldError>{formErrors.pricePerDay}</StyledFieldError>
              )}
            </StyledField>
            <StyledField>
              Image source
              <StyledInput
                type="text"
                name="imageSource"
                value={formValues.imageSource}
                onChange={handleChange}
              />
              {formErrors.imageSource && (
                <StyledFieldError>{formErrors.imageSource}</StyledFieldError>
              )}
            </StyledField>
            <StyledSubmitButton type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save bike details"}
            </StyledSubmitButton>
          </StyledForm>
        )}

        <StyledBackLink href="/admin/bikes">Back to bikes</StyledBackLink>
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
