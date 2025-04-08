import React, { useState } from "react";
import * as Styled from "./styled";
import ProductCartCard from "@/components/ProductCard/ProductCartCard";
import { CartChekoutMenuProps, ProductProps } from "@/types";
import { formatPrice } from "@/utils/Formaters";

export const calcTotalPrice = (productsInCart: ProductProps[]) => {
  const totalPrice = productsInCart.reduce(
    (total: number, product: ProductProps) => {
      return total + parseFloat(product.price) * product.quantity;
    },
    0
  );
  return totalPrice;
};

function CartCheckoutMenu({
  isOpen,
  handleOpen,
  productList,
  removeFromCart,
}: CartChekoutMenuProps) {
  

  return (
    <Styled.CartMenuContainer data-testid="right-menu" open={isOpen}>
      <Styled.CartMenuTopItems>
        <Styled.CartMenuHeader>
          <h3>Carrinho de compras</h3>
          <button onClick={() => handleOpen(false)}>X</button>
        </Styled.CartMenuHeader>
        <Styled.CartMenuProductsContainer>
          {productList &&
            productList.map((item, index) => (
              <ProductCartCard product={item} removeFromCart={removeFromCart} key={index} />
            ))}
        </Styled.CartMenuProductsContainer>
      </Styled.CartMenuTopItems>
      <Styled.CartMenuBottomItems>
        <Styled.CartMenuTotalPrice>
          <h3>Total:</h3>
          <h3>{formatPrice(calcTotalPrice(productList))}</h3>
        </Styled.CartMenuTotalPrice>
        <Styled.CartMenuBuyButton>Finalizar compra</Styled.CartMenuBuyButton>
      </Styled.CartMenuBottomItems>
    </Styled.CartMenuContainer>
  );
}

export default CartCheckoutMenu;
