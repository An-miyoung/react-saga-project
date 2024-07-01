import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../aesets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleCartOpen} />
      <span className="item-count"> 0</span>
    </div>
  );
};

export default CartIcon;
