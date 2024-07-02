import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../aesets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCounts } = useContext(CartContext);

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCounts} </span>
    </div>
  );
};

export default CartIcon;
