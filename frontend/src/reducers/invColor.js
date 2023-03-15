import { INV_GET_COLOR, INV_EDIT_COLOR } from '../actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const invColorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_COLOR:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case INV_EDIT_COLOR:
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

export default invColorReducer;
