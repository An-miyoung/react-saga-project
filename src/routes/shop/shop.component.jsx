import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/category.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <div className="shop-container">
      <Routes>
        <Route index element={<CategoriesPreview />} />
        {/* category 라는 key 로 url 에 쓰여진 value 를 가져온다 */}
        <Route path=":category" element={<Category />} />
      </Routes>
    </div>
  );
};

export default Shop;
