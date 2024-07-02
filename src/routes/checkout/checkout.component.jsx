import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

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
