import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FooterSection from "@/components/FooterSection";

describe("Footer", () => {
  it("should render Footer component", () => {
    render(
      <FooterSection />
    );

    expect(screen.getByText("MKS sistemas © Todos os direitos reservados")).toBeInTheDocument();
  });
});
