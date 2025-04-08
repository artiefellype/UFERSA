import React from "react";
import * as Styled from "./styled";
import { CardSpinButtonProps } from "@/types";

function CardSpinButton({
  productQuantity,
  increase,
  decrease,
}: CardSpinButtonProps) {
  return (
    <Styled.CardProductSpinButtons>
      <button data-testid="decrease-button" onClick={() => decrease()}>
        {" "}
        <p>-</p>{" "}
      </button>
      <hr />
      <div>
        {" "}
        <p data-testid="product-quantity" >{productQuantity}</p>{" "}
      </div>
      <hr />
      <button data-testid="increase-button" onClick={() => increase()}>
        {" "}
        <p>+</p>{" "}
      </button>
    </Styled.CardProductSpinButtons>
  );
}

export default CardSpinButton;
