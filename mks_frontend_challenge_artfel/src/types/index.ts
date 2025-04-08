import { ReactNode } from "react";

export interface CartProviderProps {
  children?: ReactNode | undefined;
}

export interface CartContextProps {
  cartProduct: ProductProps[];
  handleAddCartProducts: (item: ProductProps) => void;
  handleRemoveCartProducts: (item: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export interface CardSpinButtonProps {
  productQuantity: number;
  increase: () => void;
  decrease: () => void;
}

export interface ProductProps {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  quantity: number;
}

export interface CartButtonProps {
  itensQuantity: number;
  isOpen: (item: boolean) => void;
}

export interface HeaderSectionProps {
  cartProducts: ProductProps[];
  removeFromCart: (item: number) => void;
}

export interface ProductCardProps {
  product: ProductProps;
  addToCart: (item: ProductProps) => void;
}

export interface CartChekoutMenuProps {
  isOpen: boolean;
  handleOpen: (item: boolean) => void;
  productList: ProductProps[];
  removeFromCart: (item: number) => void;
}

export interface ProductCartCardProps {
  product: ProductProps;
  removeFromCart: (item: number) => void;
}

export interface ProductsSectionProps {
  products: ProductProps[];
  isLoading: boolean;
  addToCart: (item: ProductProps) => void;
}

export interface ResponseApiProps {
  products: ProductProps[];
  count: number;
}
