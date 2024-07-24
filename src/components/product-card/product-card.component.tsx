import { useSelector, useDispatch } from "react-redux";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { CategoryItem } from "../../store/categories/category.types";

type ProductCardProp = {
  product: CategoryItem;
};

const ProductCard: React.FC<ProductCardProp> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        장바구니 넣기
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
