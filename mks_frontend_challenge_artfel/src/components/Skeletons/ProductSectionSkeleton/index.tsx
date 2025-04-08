import React from "react";
import * as Styled from "./styled";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { randomInt } from "crypto";

function ProductsSectionSkeleton() {
  return (
    <Styled.Container data-testid="product-section-skeleton">
      <Styled.ProductsContainer>
        {Array(8).fill(null).map((_, index) => index + 1).map((item, index) => {
          return <ProductCardSkeleton key={index}/>;
        })}
      </Styled.ProductsContainer>
    </Styled.Container>
  );
}

export default ProductsSectionSkeleton;
