import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

describe('alertReducer', () => {
  it('should return the initial state', () => {
    expect(alertReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_ALERT', () => {
    const payload = { id: 1, msg: 'Test Alert' };
    expect(alertReducer([], { type: SET_ALERT, payload })).toEqual([payload]);
  });

  it('should handle REMOVE_ALERT', () => {
    const payload = 1;
    const alert = { id: 1, msg: 'Test Alert' };
    expect(alertReducer([alert], { type: REMOVE_ALERT, payload })).toEqual([]);
  });
});
