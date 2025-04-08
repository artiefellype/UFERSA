import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductProps, ResponseApiProps } from "@/types";
import HeaderSection from "@/components/HeaderSection";
import ProductsSection from "@/components/ProductsSession";
import EmptyPage from "@/components/EmptyPage";
import ProductsSectionSkeleton from "@/components/Skeletons/ProductSectionSkeleton";
import FooterSection from "@/components/FooterSection";
import { faker } from "@faker-js/faker";

const renderHomeMock = (isLoading: boolean, data: ResponseApiProps) => {
  render(
    <>
      <HeaderSection
        cartProducts={[]}
        removeFromCart={function (item: number): void {
          throw new Error("Function not implemented.");
        }}
      />
      {!isLoading ? (
        data && data.products.length != 0 ? (
          <ProductsSection
            products={data.products}
            isLoading={isLoading}
            addToCart={function (item: ProductProps): void {
              throw new Error("Function not implemented.");
            }}
          />
        ) : (
          <EmptyPage />
        )
      ) : (
        <ProductsSectionSkeleton />
      )}
      <FooterSection />
    </>
  );
};

describe("Product Section", () => {
  it("renders loading skeleton when isLoading is true", async () => {
    const isLoading = true;
    const data = {
      products: [],
      count: 0,
    };

    renderHomeMock(isLoading, data);

    expect(screen.getByTestId("product-section-skeleton")).toBeInTheDocument();
  });

  it("renders loading empty page when data products is empty", async () => {
    const isLoading = false;
    const data = {
      products: [],
      count: 0,
    };

    renderHomeMock(isLoading, data);

    expect(screen.getByTestId("empty-page")).toBeInTheDocument();
  });

  it("renders product page when data has products", async () => {
    const isLoading = false;
    const data = {
      products: [
        {
          id: parseFloat(faker.string.alphanumeric()),
          name: faker.person.fullName(),
          brand: faker.company.buzzNoun(),
          description: faker.person.jobDescriptor(),
          photo: "/icons/shopping-bag.svg",
          price: faker.string.alphanumeric(),
          quantity: parseFloat(faker.string.alphanumeric()),
        },
        {
          id: parseFloat(faker.string.alphanumeric()),
          name: faker.person.fullName(),
          brand: faker.company.buzzNoun(),
          description: faker.person.jobDescriptor(),
          photo: "/icons/shopping-bag.svg",
          price: faker.string.alphanumeric(),
          quantity: parseFloat(faker.string.alphanumeric()),
        },
      ],
      count: 0,
    };

    renderHomeMock(isLoading, data);

    expect(screen.getByTestId("product-page")).toBeInTheDocument();
  });
});
