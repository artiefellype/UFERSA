import EmptyPage from "@/components/EmptyPage";
import FooterSection from "@/components/FooterSection";
import HeaderSection from "@/components/HeaderSection";
import ProductsSection from "@/components/ProductsSession";
import ProductsSectionSkeleton from "@/components/Skeletons/ProductSectionSkeleton";
import { CartContext } from "@/contexts/CartContext";
import { BaseAPI } from "@/services/baseApi";
import { ResponseApiProps } from "@/types";
import React, { useContext } from "react";
import { useQuery } from "react-query";

function Home() {
  const { cartProduct, handleRemoveCartProducts, handleAddCartProducts } =
    useContext(CartContext);
  const API = new BaseAPI();

  const { data, isLoading, isError } = useQuery("api_data", () =>
    API.get<ResponseApiProps>()
  );

  return (
    <>
      <HeaderSection
        cartProducts={cartProduct || []}
        removeFromCart={handleRemoveCartProducts}
      />
      {!isLoading ? (data && data.products.length != 0 ? (
        <ProductsSection
          products={data.products}
          isLoading={isLoading}
          addToCart={handleAddCartProducts}
        />
      ) : (
        <EmptyPage />
      )):
      <ProductsSectionSkeleton />}
      <FooterSection />
    </>
  );
}

export default Home;
