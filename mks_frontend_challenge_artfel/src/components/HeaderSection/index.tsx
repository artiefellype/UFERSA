import React, { useState } from "react";
import * as Styled from "./style";
import CartButton from "../Buttons/CartButton";
import CartCheckoutMenu from "./CartCheckoutMenu";
import { HeaderSectionProps } from "@/types";



function HeaderSection({ cartProducts, removeFromCart }: HeaderSectionProps) {
  const [open, setOpen] = useState(false);

  const handleCartMenuOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <>
      <CartCheckoutMenu
        isOpen={open}
        handleOpen={handleCartMenuOpen}
        productList={cartProducts}
        removeFromCart={removeFromCart}
      />
      <Styled.HeaderContainer>
        <Styled.LogoContainer>
          <h1>
            MKS <span>Sistemas</span>
          </h1>
        </Styled.LogoContainer>
        <CartButton
          itensQuantity={cartProducts ? cartProducts.length : 0}
          isOpen={handleCartMenuOpen}
        />
      </Styled.HeaderContainer>
    </>
  );
}

export default HeaderSection;
