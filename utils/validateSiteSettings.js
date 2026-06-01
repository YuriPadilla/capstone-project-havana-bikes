const requiredStringFields = [
  "businessName",
  "currency",
  "openingHours",
  "address",
  "pickupReturnInfo",
  "depositInfo",
];

const requiredNumberFields = [
  "hourlyPrice",
  "firstDayPrice",
  "additionalDayPrice",
  "depositAmount",
];

const optionalStringFields = ["phone", "whatsapp", "email"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSiteSettings(input = {}) {
  const errors = {};
  const sanitizedSettings = {};

  requiredStringFields.forEach((field) => {
    const value = input[field];

    if (typeof value !== "string" || value.trim() === "") {
      errors[field] = "This field is required.";
      return;
    }

    sanitizedSettings[field] = value.trim();
  });

  requiredNumberFields.forEach((field) => {
    const value = Number(input[field]);

    if (input[field] === "" || input[field] === null || input[field] === undefined) {
      errors[field] = "This field is required.";
      return;
    }

    if (Number.isNaN(value)) {
      errors[field] = "Please enter a valid number.";
      return;
    }

    if (value < 0) {
      errors[field] = "This field must be greater than or equal to 0.";
      return;
    }

    sanitizedSettings[field] = value;
  });

  optionalStringFields.forEach((field) => {
    const value = input[field];

    if (value === undefined || value === null) {
      sanitizedSettings[field] = "";
      return;
    }

    sanitizedSettings[field] =
      typeof value === "string" ? value.trim() : String(value).trim();
  });

  if (
    sanitizedSettings.email &&
    !isValidEmail(sanitizedSettings.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedSettings,
  };
}
