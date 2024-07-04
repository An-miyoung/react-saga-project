import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCounts } = useContext(CartContext);

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCounts} </ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
