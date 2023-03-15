import { EDIT_EMPLOYEE, GET_EMPLOYEE, TOGGLE_EMPLOYEE } from 'actions/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const employeeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        tableData: payload.data,
        rowCount: payload.meta.totalRowCount
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        tableData: state.tableData.map((data) =>
          data._id === payload._id ? payload : data
        )
      };
    case TOGGLE_EMPLOYEE:
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

export default employeeReducer;
