import { expect } from 'chai';
import {
  INV_EDIT_BRAND,
  INV_GET_BRAND,
  INV_TOGGLE_BRAND,
  INV_GET_COUNT
} from 'actions/types';

describe('invBrandReducer', () => {
  const initialState = {
    count: null,
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(invBrandReducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle INV_GET_COUNT', () => {
    const payload = 10;
    const expectedState = {
      ...initialState,
      count: payload
    };
    expect(
      invBrandReducer(initialState, { type: INV_GET_COUNT, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_GET_BRAND', () => {
    const payload = {
      data: [{ _id: 1 }, { _id: 2 }],
      meta: { totalRowCount: 2 }
    };
    const expectedState = {
      ...initialState,
      tableData: payload.data,
      rowCount: payload.meta.totalRowCount
    };
    expect(
      invBrandReducer(initialState, { type: INV_GET_BRAND, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_EDIT_BRAND', () => {
    const payload = { _id: 1 };
    const state = {
      ...initialState,
      tableData: [{ _id: 1 }, { _id: 2 }]
    };
    const expectedState = {
      ...state,
      tableData: [payload, { _id: 2 }]
    };
    expect(
      invBrandReducer(state, { type: INV_EDIT_BRAND, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_TOGGLE_BRAND', () => {
    const payload = { _id: 1 };
    const state = {
      ...initialState,
      tableData: [{ _id: 1, isActive: 0 }, { _id: 2 }]
    };
    const expectedState = {
      ...state,
      tableData: [{ _id: 1, isActive: 1 }, { _id: 2 }]
    };
    expect(
      invBrandReducer(state, { type: INV_TOGGLE_BRAND, payload })
    ).to.deep.equal(expectedState);
  });
});
