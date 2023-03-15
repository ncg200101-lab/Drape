import { GET_CATEGORY, EDIT_CATEGORY } from '../actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const splCategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
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

export default splCategoryReducer;
