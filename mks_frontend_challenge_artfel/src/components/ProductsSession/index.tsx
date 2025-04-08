import React from "react";
import * as Styled from "./styled";
import { ProductProps, ProductsSectionProps } from "@/types";
import ProductCard from "../ProductCard";

function ProductsSection({ products, addToCart }: ProductsSectionProps) {
  return (
    <Styled.Container data-testid="product-page">
      <Styled.ProductsContainer>
        {products.map((item: ProductProps, index) => {
          return <ProductCard product={item} addToCart={addToCart} key={index}/>;
        })}
      </Styled.ProductsContainer>
    </Styled.Container>
  );
}

export default ProductsSection;
