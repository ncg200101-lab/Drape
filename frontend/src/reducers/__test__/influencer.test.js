import { GET_INFLUENCER, EDIT_INFLUENCER } from '../actions/types';

describe('influencerReducer', () => {
  const initialState = {
    tableData: [],
    rowCount: 0
  };

  it('should return the initial state', () => {
    expect(influencerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INFLUENCER', () => {
    const payload = {
      data: [
        { _id: 1, name: 'John' },
        { _id: 2, name: 'Doe' }
      ],
      meta: { totalRowCount: 2 }
    };
    expect(
      influencerReducer(initialState, { type: GET_INFLUENCER, payload })
    ).toEqual({
      ...initialState,
      tableData: payload.data,
      rowCount: payload.meta.totalRowCount
    });
  });

  it('should handle EDIT_INFLUENCER', () => {
    const payload = { _id: 1, name: 'John Doe' };
    const state = {
      ...initialState,
      tableData: [
        { _id: 1, name: 'John' },
        { _id: 2, name: 'Doe' }
      ]
    };
    expect(
      influencerReducer(state, { type: EDIT_INFLUENCER, payload })
    ).toEqual({
      ...state,
      tableData: [payload, { _id: 2, name: 'Doe' }]
    });
  });
});
