import { expect } from 'chai';

describe('splUsedDetailsReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      tableData: [],
      rowCount: 0
    };
    expect(splUsedDetailsReducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('should handle GET_USED_SUMMARY', () => {
    const payload = {
      data: [{ id: 1 }, { id: 2 }],
      meta: { totalCount: 2 }
    };
    const expectedState = {
      tableData: [{ id: 1 }, { id: 2 }],
      rowCount: 2
    };
    expect(
      splUsedDetailsReducer(undefined, { type: GET_USED_SUMMARY, payload })
    ).to.deep.equal(expectedState);
  });
});
