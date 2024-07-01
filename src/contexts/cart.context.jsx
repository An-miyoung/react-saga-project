import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const exsitingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (exsitingCartItem) {
    // 기존상품에서 갯수추가
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...cartItems, quantity: item.quantity + 1 }
        : cartItems
    );
  }
  // 새상품추가
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCounts: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounts, setCartCounts] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCounts,
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCounts(newCartCount);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
