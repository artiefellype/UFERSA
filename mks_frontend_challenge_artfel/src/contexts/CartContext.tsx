import { CartContextProps, CartProviderProps, ProductProps } from "@/types";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({} as CartContextProps);



export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartProduct, setCartProducts] = useState<ProductProps[]>([]);

  const handleAddCartProducts = (newProduct: ProductProps) => {
    if (cartProduct.some(product => product.id === newProduct.id)) {
      updateQuantity(newProduct.id, newProduct.quantity + 1);
    } else {
      newProduct.quantity = 1;
      setCartProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success("Produto adicionado ao carrinho");
    }
  };

  const handleRemoveCartProducts = (productId: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    const index = cartProduct.findIndex((product) => product.id === id);
    const newCartProducts = [...cartProduct];
    newCartProducts[index].quantity = quantity;
    setCartProducts(newCartProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartProduct,
        handleAddCartProducts,
        handleRemoveCartProducts,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
