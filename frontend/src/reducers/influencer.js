import { GET_INFLUENCER, EDIT_INFLUENCER } from '../actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const influencerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INFLUENCER:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case EDIT_INFLUENCER:
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

export default influencerReducer;
