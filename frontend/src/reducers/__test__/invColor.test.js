import { INV_GET_COLOR, INV_EDIT_COLOR } from '../actions/types';
import { expect } from 'chai';

describe('invColorReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(invColorReducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle INV_GET_COLOR', () => {
    const payload = {
      data: [
        { _id: 1, color: 'red' },
        { _id: 2, color: 'blue' }
      ],
      meta: { totalRowCount: 2 }
    };
    const expectedState = {
      tableData: [
        { _id: 1, color: 'red' },
        { _id: 2, color: 'blue' }
      ],
      rowCount: 2
    };
    expect(
      invColorReducer(initialState, { type: INV_GET_COLOR, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_EDIT_COLOR', () => {
    const payload = { _id: 1, color: 'green' };
    const expectedState = {
      tableData: [
        { _id: 1, color: 'green' },
        { _id: 2, color: 'blue' }
      ],
      rowCount: 2
    };
    expect(
      invColorReducer(
        {
          tableData: [
            { _id: 1, color: 'red' },
            { _id: 2, color: 'blue' }
          ],
          rowCount: 2
        },
        { type: INV_EDIT_COLOR, payload }
      )
    ).to.deep.equal(expectedState);
  });
});
