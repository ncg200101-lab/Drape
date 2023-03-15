// not completed
import { expect } from 'chai';
import authReducer from '../authReducer';
import {
  SIGNUP_SUCCESS,
  VERIFY_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

describe('authReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      token: localStorage.getItem('dftoken'),
      isAuthenticated: null,
      loading: true,
      user: null
    };
    expect(authReducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('should handle USER_LOADED', () => {
    const payload = { name: 'John Doe' };
    const expectedState = {
      token: localStorage.getItem('dftoken'),
      isAuthenticated: true,
      loading: false,
      user: payload
    };
    expect(
      authReducer(undefined, { type: USER_LOADED, payload })
    ).to.deep.equal(expectedState);
  });

  it('should handle SIGNUP_SUCCESS, VERIFY_SUCCESS and LOGIN_SUCCESS', () => {
    const payload = { token: '1234567890' };
    const expectedState = {
      token: '1234567890',
      isAuthenticated: true,
      loading: false,
      user: null
    };
    expect(
      authReducer(undefined, { type: SIGNUP_SUCCESS, payload })
    ).to.deep.equal(expectedState);
    expect(
      authReducer(undefined, { type: VERIFY_SUCCESS, payload })
    ).to.deep.equal(expectedState);
    expect(
      authReducer(undefined, { type: LOGIN_SUCCESS, payload })
    ).to.deep.equal(expectedState);
  });
});
