import { GET_USED_DETAILS } from 'actions/types';

describe('splUsedDetailsReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(splUsedDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USED_DETAILS', () => {
    const payload = {
      data: [{ id: 1 }, { id: 2 }],
      meta: { totalCount: 2 }
    };
    const expectedState = {
      tableData: [{ id: 1 }, { id: 2 }],
      rowCount: 2
    };
    expect(
      splUsedDetailsReducer(initialState, { type: GET_USED_DETAILS, payload })
    ).toEqual(expectedState);
  });
});
