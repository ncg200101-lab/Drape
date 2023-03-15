import { GET_CATEGORY, EDIT_CATEGORY } from '../actions/types';

describe('splCategoryReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(splCategoryReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_CATEGORY', () => {
    const payload = {
      data: [{ _id: 1, name: 'Test' }],
      meta: { totalRowCount: 1 }
    };
    const expectedState = {
      tableData: [{ _id: 1, name: 'Test' }],
      rowCount: 1
    };
    expect(
      splCategoryReducer(initialState, { type: GET_CATEGORY, payload })
    ).toEqual(expectedState);
  });

  it('should handle EDIT_CATEGORY', () => {
    const payload = { _id: 1, name: 'Updated Test' };
    const expectedState = {
      tableData: [{ _id: 1, name: 'Updated Test' }],
      rowCount: 0
    };
    expect(
      splCategoryReducer(
        { tableData: [{ _id: 1, name: 'Test' }], rowCount: 0 },
        { type: EDIT_CATEGORY, payload }
      )
    ).toEqual(expectedState);
  });
});
