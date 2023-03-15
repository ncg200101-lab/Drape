import { expect } from 'chai';
import splProductReducer from '../reducers/splProductReducer';
import {
  GET_PROD_CATEGORY,
  GET_CATEGORY,
  EDIT_CATEGORY,
  GET_PRODUCT
} from '../actions/types';

describe('splProductReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      prodCategories: [],
      tableData: [],
      rowCount: 0
    };
    expect(splProductReducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('should handle GET_PROD_CATEGORY', () => {
    const payload = ['category1', 'category2'];
    const expectedState = {
      prodCategories: payload,
      tableData: [],
      rowCount: 0
    };
    expect(
      splProductReducer(undefined, { type: GET_PROD_CATEGORY, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle GET_PRODUCT', () => {
    const payload = {
      data: [
        { _id: 1, name: 'product1' },
        { _id: 2, name: 'product2' }
      ],
      meta: { totalRowCount: 2 }
    };
    const expectedState = {
      prodCategories: [],
      tableData: payload.data,
      rowCount: payload.meta.totalRowCount
    };
    expect(
      splProductReducer(undefined, { type: GET_PRODUCT, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle EDIT_CATEGORY', () => {
    const payload = { _id: 1, name: 'product1' };
    const initialState = {
      prodCategories: [],
      tableData: [
        { _id: 1, name: 'product1' },
        { _id: 2, name: 'product2' }
      ],
      rowCount: 2
    };
    const expectedState = {
      prodCategories: [],
      tableData: [payload],
      rowCount: 2
    };
    expect(
      splProductReducer(initialState, { type: EDIT_CATEGORY, payload })
    ).to.deep.equal(expectedState);
  });
});
