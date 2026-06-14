export function buildContactConfirmationEmail({
  customerName,
  message,
  siteSettings = {},
}) {
  const contactLines = [
    siteSettings.email && `Email: ${siteSettings.email}`,
    siteSettings.phone && `Phone: ${siteSettings.phone}`,
    siteSettings.whatsapp && `WhatsApp: ${siteSettings.whatsapp}`,
    siteSettings.address && `Address: ${siteSettings.address}`,
  ].filter(Boolean);

  const textSections = [
    `Hello ${customerName},`,
    "Havana Bikes received your message:",
    message,
    "We will respond as soon as possible.",
    "Havana Bikes",
  ];

  if (contactLines.length > 0) {
    textSections.push(contactLines.join("\n"));
  }

  return {
    subject: "We received your message — Havana Bikes",
    text: textSections.join("\n\n"),
  };
}
