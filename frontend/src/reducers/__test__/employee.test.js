import { EDIT_EMPLOYEE, GET_EMPLOYEE, TOGGLE_EMPLOYEE } from 'actions/types';

describe('employeeReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(employeeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_EMPLOYEE', () => {
    const payload = {
      data: [{ _id: 1, name: 'John' }],
      meta: { totalRowCount: 1 }
    };
    expect(
      employeeReducer(initialState, { type: GET_EMPLOYEE, payload })
    ).toEqual({
      ...initialState,
      tableData: payload.data,
      rowCount: payload.meta.totalRowCount
    });
  });

  it('should handle EDIT_EMPLOYEE', () => {
    const payload = { _id: 1, name: 'John Doe' };
    const state = {
      ...initialState,
      tableData: [{ _id: 1, name: 'John' }]
    };
    expect(employeeReducer(state, { type: EDIT_EMPLOYEE, payload })).toEqual({
      ...state,
      tableData: [payload]
    });
  });

  it('should handle TOGGLE_EMPLOYEE', () => {
    const payload = { _id: 1, isActive: 0 };
    const state = {
      ...initialState,
      tableData: [{ _id: 1, isActive: 0 }]
    };
    expect(employeeReducer(state, { type: TOGGLE_EMPLOYEE, payload })).toEqual({
      ...state,
      tableData: [{ _id: 1, isActive: 1 }]
    });
  });
});
