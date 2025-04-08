import React from "react";
import * as Styled from "./styled";
import Image from "next/image";
import { ProductCardProps } from "@/types";
import { formatPrice } from "@/utils/Formaters";




function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Styled.CardContainer>
      <Styled.CardProductContainer>
        <Styled.CardProductImgContainer>
          <Image
            src={product.photo}
            alt={"Imagem do produto"}
            width={130}
            height={140}
          ></Image>
        </Styled.CardProductImgContainer>
        <Styled.CardProductInfoContainer>
          <Styled.CardProductTitle>
            {`${product.brand} ${product.name}`}
          </Styled.CardProductTitle>
          <Styled.CardProductPrice>
            {" "}
            <p>{formatPrice(parseFloat(product.price))}</p>{" "}
          </Styled.CardProductPrice>
        </Styled.CardProductInfoContainer>
        <Styled.CardProductDescription>
          <p>{product.description}</p>
        </Styled.CardProductDescription>
      </Styled.CardProductContainer>
      <Styled.CardShopButton onClick={() => addToCart(product)}>
        <div>
          <Image
            src={"/icons/shopping-bag.svg"}
            alt={""}
            width={12}
            height={13.5}
          ></Image>

          <h3>COMPRAR</h3>
        </div>
      </Styled.CardShopButton>
    </Styled.CardContainer>
  );
}

export default ProductCard;
