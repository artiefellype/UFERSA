import React from "react";
import * as Styled from "./styled";
import Image from "next/image";
import { CartButtonProps } from "@/types";


function CartButton({ itensQuantity, isOpen }: CartButtonProps) {
  return (
    <Styled.CartButton data-testid="cart-button" onClick={() => isOpen(true)}>
      <Image
        src={"/icons/shopping-cart.svg"}
        alt={"shop cart icon"}
        width={19}
        height={18}
      />
      <p>{itensQuantity ? itensQuantity : 0}</p>
    </Styled.CartButton>
  );
}

export default CartButton;
