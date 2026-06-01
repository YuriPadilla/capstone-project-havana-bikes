import { calculateRentalPrice } from "@/utils/calculateRentalPrice";

describe("calculateRentalPrice", () => {
  test("calculates one bike for one day", () => {
    expect(calculateRentalPrice(1, 1, 15, 10)).toBe(15);
  });

  test("calculates one bike for two days", () => {
    expect(calculateRentalPrice(1, 2, 15, 10)).toBe(25);
  });

  test("calculates two bikes for two days", () => {
    expect(calculateRentalPrice(2, 2, 15, 10)).toBe(50);
  });

  test("calculates configurable first day and additional day prices", () => {
    expect(calculateRentalPrice(1, 3, 20, 12)).toBe(44);
  });

  test("returns 0 for invalid values", () => {
    expect(calculateRentalPrice("", 1, 15, 10)).toBe(0);
    expect(calculateRentalPrice(1, "", 15, 10)).toBe(0);
    expect(calculateRentalPrice(0, 1, 15, 10)).toBe(0);
    expect(calculateRentalPrice(1, 0, 15, 10)).toBe(0);
    expect(calculateRentalPrice(1, 1, "invalid", 10)).toBe(0);
    expect(calculateRentalPrice(1, 1, 15, -1)).toBe(0);
  });
});
