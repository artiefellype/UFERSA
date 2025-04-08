import { calcTotalPrice } from "@/components/HeaderSection/CartCheckoutMenu";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Header Cart Menu", () => {
  it("should return calculate total value correctly", () => {
    const productMockList = [
      {
        id: parseFloat(faker.string.alphanumeric()),
        name: faker.person.fullName(),
        brand: faker.company.buzzNoun(),
        description: faker.person.jobDescriptor(),
        photo: "/icons/shopping-bag.svg",
        price: "2500.00",
        quantity: 2,
      },
      {
        id: parseFloat(faker.string.alphanumeric()),
        name: faker.person.fullName(),
        brand: faker.company.buzzNoun(),
        description: faker.person.jobDescriptor(),
        photo: "/icons/shopping-bag.svg",
        price: "1600.00",
        quantity: 1,
      },
    ];

    const total = calcTotalPrice(productMockList);
    expect(total).toBe(6600);
  });
});
