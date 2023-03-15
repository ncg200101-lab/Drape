import {
  GET_MEN_BASIC_INFO,
  GET_MEN_PRICE_RANGE,
  GET_MEN_STYLE_FIT,
  GET_MEN_STYLE_CUSTOM,
  GET_MEN_SCHEDULE,
  MEN_GET_ALL_ADDRESS,
  MEN_DELETE_ADDRESS,
  GET_WOMEN_BASIC_INFO,
  GET_WOMEN_STYLE_FIT,
  GET_WOMEN_PRICE_RANGE,
  GET_WOMEN_STYLE_CUSTOM,
  GET_WOMEN_SCHEDULE,
  WOMEN_GET_ALL_ADDRESS,
  WOMEN_DELETE_ADDRESS
} from 'actions/types';

const initialState = {
  loading: true,
  mBasicInfo: null,
  mStyleFit: null,
  mPriceRange: null,
  mStyleCustom: null,
  mSchedule: null,
  mAllAddress: [],
  wBasicInfo: null,
  wStyleFit: null,
  wPriceRange: null,
  wStyleCustom: null,
  wSchedule: null,
  wAllAddress: []
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEN_BASIC_INFO:
      return {
        ...state,
        mBasicInfo: payload,
        loading: false
      };
    case GET_MEN_STYLE_FIT:
      return {
        ...state,
        mStyleFit: payload,
        loading: false
      };
    case GET_MEN_PRICE_RANGE:
      return {
        ...state,
        mPriceRange: payload,
        loading: false
      };
    case GET_MEN_STYLE_CUSTOM:
      return {
        ...state,
        mStyleCustom: payload,
        loading: false
      };
    case GET_MEN_SCHEDULE:
      return {
        ...state,
        mSchedule: payload,
        loading: false
      };
    case GET_WOMEN_BASIC_INFO:
      return {
        ...state,
        wBasicInfo: payload,
        loading: false
      };
    case GET_WOMEN_STYLE_FIT:
      return {
        ...state,
        wStyleFit: payload,
        loading: false
      };
    case GET_WOMEN_PRICE_RANGE:
      return {
        ...state,
        wPriceRange: payload,
        loading: false
      };
    case GET_WOMEN_STYLE_CUSTOM:
      return {
        ...state,
        wStyleCustom: payload,
        loading: false
      };
    case GET_WOMEN_SCHEDULE:
      return {
        ...state,
        wSchedule: payload,
        loading: false
      };
    case WOMEN_DELETE_ADDRESS:
      return {
        ...state,
        wAllAddress: state.wAllAddress.filter(
          (address) => address._id !== payload
        ),
        loading: false
      };
    case WOMEN_GET_ALL_ADDRESS:
      return {
        ...state,
        wAllAddress: payload,
        loading: false
      };
    case MEN_DELETE_ADDRESS:
      return {
        ...state,
        mAllAddress: state.mAllAddress.filter(
          (address) => address._id !== payload
        ),
        loading: false
      };
    case MEN_GET_ALL_ADDRESS:
      return {
        ...state,
        mAllAddress: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
