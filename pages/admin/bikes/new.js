import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
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

const StyledCheckboxField = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-s);
  font-weight: 600;
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

const StyledBackLink = styled(Link)`
  display: inline-flex;
  width: fit-content;
  margin-top: var(--space-m);
  color: inherit;
  font-weight: 600;
`;

const initialFormValues = {
  name: "",
  brand: "",
  size: "",
  type: "",
  description: "",
  pricePerDay: "",
  isActive: true,
  imageFile: null,
};

export default function NewAdminBikePage() {
  const { status } = useSession();
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, type, value, checked, files } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
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

    if (!formValues.imageFile) {
      errors.imageFile = "Please select an image.";
    }

    return errors;
  }

  async function getErrorMessage(response) {
    try {
      const errorData = await response.json();

      return (
        errorData.message ||
        errorData.error ||
        "Bike could not be created. Please try again."
      );
    } catch (error) {
      return "Bike could not be created. Please try again.";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", formValues.name.trim());
    formData.append("brand", formValues.brand.trim());
    formData.append("size", formValues.size.trim());
    formData.append("type", formValues.type.trim());
    formData.append("description", formValues.description.trim());
    formData.append("pricePerDay", String(Number(formValues.pricePerDay)));
    formData.append("isActive", String(formValues.isActive));
    formData.append("image", formValues.imageFile);

    try {
      const response = await fetch("/api/admin/bikes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setSubmitError(errorMessage);
        return;
      }

      await router.push("/admin/bikes");
    } catch (error) {
      setSubmitError("Bike could not be created. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="New bike">
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
    <StandardSectionApp sectionTitle="New bike">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>Add a new bike to the inventory.</StyledText>
        {submitError && <StyledErrorMessage>{submitError}</StyledErrorMessage>}
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
          <StyledCheckboxField>
            <input
              type="checkbox"
              name="isActive"
              checked={formValues.isActive}
              onChange={handleChange}
            />
            Active
          </StyledCheckboxField>
          <StyledField>
            Image file
            <StyledInput
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
            />
            {formErrors.imageFile && (
              <StyledFieldError>{formErrors.imageFile}</StyledFieldError>
            )}
          </StyledField>
          <StyledSubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create bike"}
          </StyledSubmitButton>
        </StyledForm>

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
