import {
  INV_EDIT_BRAND,
  INV_GET_BRAND,
  INV_TOGGLE_BRAND,
  INV_GET_COUNT
} from 'actions/types';

const initialState = {
  count: null,
  tableData: [],
  rowCount: 0
};

const invBrandReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_COUNT:
      return {
        ...state,
        count: payload
      };
    case INV_GET_BRAND:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case INV_EDIT_BRAND:
      return {
        ...state,
        tableData: state.tableData.map((data) =>
          data._id === payload._id ? payload : data
        )
      };
    case INV_TOGGLE_BRAND:
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

export default invBrandReducer;
