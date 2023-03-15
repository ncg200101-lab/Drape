import {
  INV_GET_PROD_SUB_CATEGORY,
  INV_EDIT_PROD_SUB_CATEGORY,
  INV_GET_PRODUCT_CATEGORIES
} from '../actions/types';

const initialState = {
  prodCategories: [],
  tableData: [],
  rowCount: 0
};

const invProdSubCatetoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        prodCategories: payload
      };
    case INV_GET_PROD_SUB_CATEGORY:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case INV_EDIT_PROD_SUB_CATEGORY:
      return {
        ...state,
        tableData: state.tableData.map((data) =>
          data._id === payload._id ? payload : data
        )
      };
    default:
      return state;
  }
};

export default invProdSubCatetoryReducer;
