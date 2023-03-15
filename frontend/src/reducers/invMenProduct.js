import {
  INV_GET_PRODUCT_CATEGORIES,
  INV_GET_PRODUCT_SUB_CATEGORIES,
  INV_GET_PRODUCT_COLORS,
  INV_GET_PRODUCT_BRANDS
} from 'actions/types';

const initialState = {
  prodCategories: [],
  prodSubCategories: [],
  prodColors: [],
  prodBrands: []
};

const invMenProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        prodCategories: payload
      };
    case INV_GET_PRODUCT_SUB_CATEGORIES:
      return {
        ...state,
        prodSubCategories: payload
      };
    case INV_GET_PRODUCT_COLORS:
      return {
        ...state,
        prodColors: payload
      };
    case INV_GET_PRODUCT_BRANDS:
      return {
        ...state,
        prodBrands: payload
      };
    default:
      return state;
  }
};

export default invMenProductReducer;
