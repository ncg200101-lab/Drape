import { GET_USED_SUMMARY } from 'actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const splUsedDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USED_SUMMARY:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalCount
      };
    default:
      return state;
  }
};

export default splUsedDetailsReducer;
