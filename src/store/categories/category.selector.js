import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// rootReducer 에 묶여있는 모든 reducer 의 selector 들이 무조건 re-render 되는 것을 막기위해
// selector 를 memoization => state.categories가 달라질 경우만 다시 selector 가 render 된다.
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// firebase 에서 들어온 값 docSnapshot.data()=categories 는
// { hats: { title: "hats", items: [{},{}...],
//   jackets: {title:"jackets", items:[{},{}]}}} 형태
// reduce 를 이용해 {hat: [{},{}....], jacket: [{},{}....]} 와 같은 형태로 변환
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
