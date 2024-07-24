import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.components";

import { CategoryContainer, Title } from "./category.styles";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  //  <keyof CategoryRouteParams>()as CategoryRouteParams 를 쓰면
  //  string | undefined 에서 undefined 를 제외시킬 수 있다.
  //  category의 value 가 undefined 일지라도 key는 항상 category로 존재
  // 이 기법은 useParams( )처럼 값이 들어오는 것이 100% 확실할때 사용

  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  // 아래 코드를 사용하면 매번 rerender 가 일어난다.
  // const products = categoriesMap[category]
  // 대신 useState와 useEffect 를 써서 필요없은 rerender를 막는다
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
