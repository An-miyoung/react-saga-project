import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import {} from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProp = {
  item: CartItem;
};

const CheckoutItem: React.FC<CheckoutItemProp> = ({ item }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = item;

  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, item));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
