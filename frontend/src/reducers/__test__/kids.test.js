import { expect } from 'chai';
import kidsReducer from './kidsReducer';

describe('kidsReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
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
    expect(kidsReducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('should handle SET_KID_ORDER', () => {
    const action = { type: 'SET_KID_ORDER', payload: 'order' };
    const expectedState = {
      order: 'order',
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
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle SET_KID_GENDER', () => {
    const action = { type: 'SET_KID_GENDER', payload: 'gender' };
    const expectedState = {
      order: null,
      gender: 'gender',
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
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_BASIC_INFO', () => {
    const action = { type: 'GET_KIDS_BASIC_INFO', payload: 'basic info' };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: 'basic info',
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
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_GIRL_STYLE_FIT', () => {
    const action = {
      type: 'GET_KIDS_GIRL_STYLE_FIT',
      payload: 'girl style fit'
    };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: null,
      kgStyleFit: 'girl style fit',
      kgPriceRange: null,
      kgStyleCustom: null,
      kgSchedule: null,
      kgAllAddress: [],
      kbStyleFit: null,
      kbPriceRange: null,
      kbStyleCustom: null,
      kbSchedule: null,
      kbAllAddress: [],
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_BOY_STYLE_FIT', () => {
    const action = { type: 'GET_KIDS_BOY_STYLE_FIT', payload: 'boy style fit' };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: null,
      kgStyleFit: null,
      kgPriceRange: null,
      kgStyleCustom: null,
      kgSchedule: null,
      kgAllAddress: [],
      kbStyleFit: 'boy style fit',
      kbPriceRange: null,
      kbStyleCustom: null,
      kbSchedule: null,
      kbAllAddress: [],
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_GIRL_PRICE_RANGE', () => {
    const action = {
      type: 'GET_KIDS_GIRL_PRICE_RANGE',
      payload: 'girl price range'
    };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: null,
      kgStyleFit: null,
      kgPriceRange: 'girl price range',
      kgStyleCustom: null,
      kgSchedule: null,
      kgAllAddress: [],
      kbStyleFit: null,
      kbPriceRange: null,
      kbStyleCustom: null,
      kbSchedule: null,
      kbAllAddress: [],
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_BOY_PRICE_RANGE', () => {
    const action = {
      type: 'GET_KIDS_BOY_PRICE_RANGE',
      payload: 'boy price range'
    };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: null,
      kgStyleFit: null,
      kgPriceRange: null,
      kgStyleCustom: null,
      kgSchedule: null,
      kgAllAddress: [],
      kbStyleFit: null,
      kbPriceRange: 'boy price range',
      kbStyleCustom: null,
      kbSchedule: null,
      kbAllAddress: [],
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });

  it('should handle GET_KIDS_GIRL_STYLE_CUSTOM', () => {
    const action = {
      type: 'GET_KIDS_GIRL_STYLE_CUSTOM',
      payload: 'girl style custom'
    };
    const expectedState = {
      order: null,
      gender: null,
      kBasicInfo: null,
      kgStyleFit: null,
      kgPriceRange: null,
      kgStyleCustom: 'girl style custom',
      kgSchedule: null,
      kgAllAddress: [],
      kbStyleFit: null,
      kbPriceRange: null,
      kbStyleCustom: null,
      kbSchedule: null,
      kbAllAddress: [],
      loading: false
    };
    expect(kidsReducer(undefined, action)).to.deep.equal(expectedState);
  });
});
