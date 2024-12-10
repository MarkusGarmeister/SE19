import { assetQuantity } from "../../../helper/quantity";

describe("Unit test for assetQuantity()", () => {
  test("positve test valid inputs for quantity and price", () => {
    const result = assetQuantity(100, 25);
    expect(result).toBe("4.0000");
  });

  test("price input 0", () => {
    const result = assetQuantity(0, 25);
    expect(result).toBe("0.0000");
  });

  test("handle floating-point precision correctly", () => {
    const result = assetQuantity(100, 33.3333);
    expect(result).toBe("3.0000");
  });

  test("price is 0 not possible", () => {
    expect(() => assetQuantity(100, 0)).toThrowError();
  });

  test("quantity is a large number 10 digits", () => {
    const result = assetQuantity(1000000000, 2);
    expect(result).toBe("500000000.0000");
  });

  test("quantity is not a number", () => {
    const result = assetQuantity("invalid", 10);
    expect(result).toBe("NaN");
  });
  test("price is not a number", () => {
    const result = assetQuantity(1000, "invalid");
    expect(result).toBe("NaN");
  });
});
