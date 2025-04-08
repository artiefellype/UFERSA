import React, { useContext } from "react";
import * as Styled from "./styled";
import CardSpinButton from "@/components/Buttons/CardSpinButtons";
import { CartContext } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { ProductCartCardProps } from "@/types";
import { formatPrice } from "@/utils/Formaters";
import Image from "next/image";

function ProductCartCard({ product, removeFromCart }: ProductCartCardProps) {
  const { cartProduct, updateQuantity } = useContext(CartContext);
  const { id, name, brand, price, photo, quantity } = product;

  const increaseProductQuantity = () => {
    updateQuantity(id, quantity + 1);
    console.log(cartProduct);
  };

  const decreaseProductQuantity = () => {
    if (quantity == 1) return;
    updateQuantity(id, quantity - 1);
  };
  return (
    
      <Styled.CardContainer initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}>
        <Styled.CardProductImgContainer>
          <Image
            src={photo}
            alt={"Imagem do produto"}
            width="0"
            height="0"
            sizes="100vw"
            className="imge"
          />
        </Styled.CardProductImgContainer>
        <Styled.CardProductInfoContainer>
          <Styled.CardProductTitle>{`${brand} ${name}`}</Styled.CardProductTitle>
        </Styled.CardProductInfoContainer>
        <Styled.CardProductSpinAndPriceMobileChange>
          <Styled.CardProductSpinButtonContainer>
            <p>Qtd:</p>
            <CardSpinButton
              productQuantity={quantity}
              increase={increaseProductQuantity}
              decrease={decreaseProductQuantity}
            />
          </Styled.CardProductSpinButtonContainer>
          <Styled.CardProductPrice>
            {" "}
            <p>{formatPrice(parseFloat(price))}</p>{" "}
          </Styled.CardProductPrice>
        </Styled.CardProductSpinAndPriceMobileChange>
        <button
          className="close-card-button"
          onClick={() => removeFromCart(id)}
        >
          {" "}
          X{" "}
        </button>
      </Styled.CardContainer>
  );
}

export default ProductCartCard;
