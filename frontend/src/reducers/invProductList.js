import {
  INV_GET_PRODUCT_LIST,
  INV_GET_INDIVIDUAL_PRODUCT,
  TOGGLE_PRODUCT
} from 'actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const invProductListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PRODUCT_LIST:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case INV_GET_INDIVIDUAL_PRODUCT:
      return {
        ...state,
        tableData: state.tableData.filter((data) => data._id === payload.id),
        rowCount: payload.quantity
      };
    case TOGGLE_PRODUCT:
      for (let data of state.tableData) {
        if (data._id === payload._id) {
          console.log(data.isActive);
          data.isActive = data.isActive === 0 ? 1 : 0;
          console.log(data.isActive);
        }
      }
      return { ...state };
    default:
      return state;
  }
};

export default invProductListReducer;
