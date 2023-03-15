import {
  GET_PROD_CATEGORY,
  GET_CATEGORY,
  EDIT_CATEGORY,
  GET_PRODUCT
} from '../actions/types';

const initialState = {
  prodCategories: [],
  tableData: [],
  rowCount: 0
};

const splProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROD_CATEGORY:
      return {
        ...state,
        prodCategories: payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        tableData: payload?.data,
        rowCount: payload?.meta?.totalRowCount
      };
    case EDIT_CATEGORY:
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

export default splProductReducer;
