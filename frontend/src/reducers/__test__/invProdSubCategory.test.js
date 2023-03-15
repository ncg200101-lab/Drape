import { expect } from 'chai';
import {
  INV_GET_PROD_SUB_CATEGORY,
  INV_EDIT_PROD_SUB_CATEGORY,
  INV_GET_PRODUCT_CATEGORIES
} from '../actions/types';

describe('invProdSubCatetoryReducer', () => {
  const initialState = {
    prodCategories: [],
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(invProdSubCatetoryReducer(undefined, {})).to.deep.equal(
      initialState
    );
  });

  it('should handle INV_GET_PRODUCT_CATEGORIES', () => {
    const payload = ['category1', 'category2'];
    const expectedState = {
      ...initialState,
      prodCategories: payload
    };
    expect(
      invProdSubCatetoryReducer(initialState, {
        type: INV_GET_PRODUCT_CATEGORIES,
        payload
      })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_GET_PROD_SUB_CATEGORY', () => {
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
      invProdSubCatetoryReducer(initialState, {
        type: INV_GET_PROD_SUB_CATEGORY,
        payload
      })
    ).to.deep.equal(expectedState);
  });

  it('should handle INV_EDIT_PROD_SUB_CATEGORY', () => {
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
      invProdSubCatetoryReducer(state, {
        type: INV_EDIT_PROD_SUB_CATEGORY,
        payload
      })
    ).to.deep.equal(expectedState);
  });
});
