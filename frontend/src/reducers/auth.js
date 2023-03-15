import {
  SIGNUP_SUCCESS,
  VERIFY_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('dftoken'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case SIGNUP_SUCCESS:
    case VERIFY_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('dftoken');
      localStorage.removeItem('fitFor');
      localStorage.removeItem('order');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
