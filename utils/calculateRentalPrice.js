export function calculateRentalPrice(
  amountBikes,
  amountDays,
  firstDayPrice = 15,
  additionalDayPrice = 10
) {
  const bikes = Number(amountBikes);
  const days = Number(amountDays);
  const firstDay = Number(firstDayPrice);
  const additionalDay = Number(additionalDayPrice);

  if (
    Number.isNaN(bikes) ||
    Number.isNaN(days) ||
    Number.isNaN(firstDay) ||
    Number.isNaN(additionalDay) ||
    bikes < 1 ||
    days < 1 ||
    firstDay < 0 ||
    additionalDay < 0
  ) {
    return 0;
  }

  if (days === 1) {
    return firstDay * bikes;
  }

  return (firstDay + additionalDay * (days - 1)) * bikes;
}
