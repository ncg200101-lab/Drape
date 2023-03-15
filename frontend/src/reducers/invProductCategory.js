import {
  INV_GET_PRODUCT_CATEGORY,
  INV_EDIT_PRODUCT_CATEGORY
} from '../actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const invProductCatetoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PRODUCT_CATEGORY:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case INV_EDIT_PRODUCT_CATEGORY:
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

export default invProductCatetoryReducer;
