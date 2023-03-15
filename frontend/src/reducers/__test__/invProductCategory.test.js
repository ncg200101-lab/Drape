import { expect } from 'chai';
import {
  INV_GET_PRODUCT_CATEGORY,
  INV_EDIT_PRODUCT_CATEGORY
} from '../actions/types';

describe('invProductCatetoryReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(invProductCatetoryReducer(undefined, {})).to.deep.equal(
      initialState
    );
  });

  it('should handle INV_GET_PRODUCT_CATEGORY', () => {
    const payload = {
      data: [{ _id: 1, name: 'Test' }],
      meta: { totalRowCount: 1 }
    };
    const expectedState = {
      tableData: [{ _id: 1, name: 'Test' }],
      rowCount: 1
    };
    expect(
      invProductCatetoryReducer(initialState, {
        type: INV_GET_PRODUCT_CATEGORY,
        payload
      })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_EDIT_PRODUCT_CATEGORY', () => {
    const payload = { _id: 1, name: 'Updated Test' };
    const expectedState = {
      tableData: [{ _id: 1, name: 'Updated Test' }],
      rowCount: 0
    };
    expect(
      invProductCatetoryReducer(
        { tableData: [{ _id: 1, name: 'Test' }], rowCount: 0 },
        { type: INV_EDIT_PRODUCT_CATEGORY, payload }
      )
    ).to.deep.equal(expectedState);
  });
});
