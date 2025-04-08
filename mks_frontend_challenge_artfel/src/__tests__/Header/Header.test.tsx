import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeaderSection from "@/components/HeaderSection";
import CartButton from "@/components/Buttons/CartButton";

describe("Header", () => {
  it("should render Header component", () => {
    render(
      <HeaderSection
        cartProducts={[]}
        removeFromCart={function (item: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(screen.getByText("MKS")).toBeInTheDocument();
  });

  it("should open right menu bar when clicked", () => {

    render(
      <HeaderSection
        cartProducts={[]}
        removeFromCart={function (item: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    
    expect(screen.getByTestId("right-menu")).toHaveStyle({
      transform: "translateX(100%)",
    });

    fireEvent.click(screen.getByTestId("cart-button"));

    expect(screen.getByTestId("right-menu")).toHaveStyle({
      transform: "translateX(0)",
    });
  });
});
