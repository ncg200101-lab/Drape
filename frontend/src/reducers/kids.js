import {
  SET_KID_ORDER,
  SET_KID_GENDER,
  GET_KIDS_BASIC_INFO,
  GET_KIDS_GIRL_STYLE_FIT,
  GET_KIDS_BOY_STYLE_FIT,
  GET_KIDS_GIRL_PRICE_RANGE,
  GET_KIDS_BOY_PRICE_RANGE,
  GET_KIDS_GIRL_STYLE_CUSTOM,
  GET_KIDS_BOY_STYLE_CUSTOM,
  KIDS_GIRL_GET_SCHEDULE,
  KIDS_BOY_GET_SCHEDULE,
  KIDS_GIRL_GET_ALL_ADDRESS,
  KIDS_GIRL_DELETE_ADDRESS,
  KIDS_BOY_GET_ALL_ADDRESS,
  KIDS_BOY_DELETE_ADDRESS
} from 'actions/types';

const initialState = {
  order: null,
  gender: null,
  kBasicInfo: null,
  kgStyleFit: null,
  kgPriceRange: null,
  kgStyleCustom: null,
  kgSchedule: null,
  kgAllAddress: [],
  kbStyleFit: null,
  kbPriceRange: null,
  kbStyleCustom: null,
  kbSchedule: null,
  kbAllAddress: [],
  loading: true
};

const kidsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_KID_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      };
    case SET_KID_GENDER:
      return {
        ...state,
        gender: payload,
        loading: false
      };
    case GET_KIDS_BASIC_INFO:
      return {
        ...state,
        kBasicInfo: payload,
        loading: false
      };
    case GET_KIDS_GIRL_STYLE_FIT:
      return {
        ...state,
        kgStyleFit: payload,
        loading: false
      };
    case GET_KIDS_BOY_STYLE_FIT:
      return {
        ...state,
        kbStyleFit: payload,
        loading: false
      };
    case GET_KIDS_GIRL_PRICE_RANGE:
      return {
        ...state,
        kgPriceRange: payload,
        loading: false
      };
    case GET_KIDS_BOY_PRICE_RANGE:
      return {
        ...state,
        kbPriceRange: payload,
        loading: false
      };
    case GET_KIDS_GIRL_STYLE_CUSTOM:
      return {
        ...state,
        kgStyleCustom: payload,
        loading: false
      };
    case GET_KIDS_BOY_STYLE_CUSTOM:
      return {
        ...state,
        kbStyleCustom: payload,
        loading: false
      };
    case KIDS_GIRL_GET_SCHEDULE:
      return {
        ...state,
        kgSchedule: payload,
        loading: false
      };
    case KIDS_BOY_GET_SCHEDULE:
      return {
        ...state,
        kbSchedule: payload,
        loading: false
      };
    case KIDS_GIRL_GET_ALL_ADDRESS:
      return {
        ...state,
        kgAllAddress: payload,
        loading: false
      };
    case KIDS_GIRL_DELETE_ADDRESS:
      return {
        ...state,
        kgAllAddress: state.kgAllAddress.filter(
          (address) => address._id !== payload
        ),
        loading: false
      };
    case KIDS_BOY_GET_ALL_ADDRESS:
      return {
        ...state,
        kbAllAddress: payload,
        loading: false
      };
    case KIDS_BOY_DELETE_ADDRESS:
      return {
        ...state,
        kbAllAddress: state.kbAllAddress.filter(
          (address) => address._id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
};

export default kidsReducer;
