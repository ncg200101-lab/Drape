import { MENU_OPEN, SET_MENU, SET_FIT_FOR, SET_LOADING } from 'actions/types';

describe('customizationReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      isOpen: [], // * for active default menu
      opened: true,
      fitFor: null,
      isLoading: false
    };
  });

  it('should return the initial state', () => {
    expect(customizationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle MENU_OPEN', () => {
    const action = { type: MENU_OPEN, id: 1 };
    expect(customizationReducer(initialState, action)).toEqual({
      ...initialState,
      isOpen: [1]
    });
  });

  it('should handle SET_MENU', () => {
    const action = { type: SET_MENU, opened: false };
    expect(customizationReducer(initialState, action)).toEqual({
      ...initialState,
      opened: false
    });
  });

  it('should handle SET_FIT_FOR', () => {
    const action = { type: SET_FIT_FOR, payload: 'test' };
    expect(customizationReducer(initialState, action)).toEqual({
      ...initialState,
      fitFor: 'test'
    });
  });

  it('should handle SET_LOADING', () => {
    const action = { type: SET_LOADING };
    expect(customizationReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });
});
