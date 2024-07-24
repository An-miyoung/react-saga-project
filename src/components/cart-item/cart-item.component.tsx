import { CartItem as TCartItem } from "../../store/cart/cart.types";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

type CartItemProp = {
  cartItem: TCartItem;
};

const CartItem: React.FC<CartItemProp> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img className="" src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="pricce">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
