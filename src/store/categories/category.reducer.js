import { CATEGORY_ACTION_TYPES } from "./category.types";

const CATEGORY_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (state = CATEGORY_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload,
      };
    default:
      return state;
  }
};
