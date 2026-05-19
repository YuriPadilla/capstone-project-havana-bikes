export function calculateRentalPrice(amountBikes, amountDays) {
  const bikes = Number(amountBikes);
  const days = Number(amountDays);

  if (
    Number.isNaN(bikes) ||
    Number.isNaN(days) ||
    bikes < 1 ||
    days < 1
  ) {
    return 0;
  }

  return (days * 10 + 5) * bikes;
}
