import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>상품이미지</span>
        </div>
        <div className="header-block">
          <span>상품명</span>
        </div>
        <div className="header-block">
          <span>수량</span>
        </div>
        <div className="header-block">
          <span>가격</span>
        </div>
        <div className="header-block">
          <span>삭제</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <span className="total">합계 : ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
