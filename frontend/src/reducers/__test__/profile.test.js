import { profileReducer } from './profileReducer';

describe('profileReducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual({
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
    });
  });

  it('should handle GET_MEN_BASIC_INFO', () => {
    const payload = { name: 'John Doe' };
    expect(
      profileReducer(undefined, { type: 'GET_MEN_BASIC_INFO', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: { name: 'John Doe' },
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
    });
  });

  it('should handle GET_MEN_STYLE_FIT', () => {
    const payload = { style: 'slim fit' };
    expect(
      profileReducer(undefined, { type: 'GET_MEN_STYLE_FIT', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: { style: 'slim fit' },
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
    });
  });

  it('should handle GET_MEN_PRICE_RANGE', () => {
    const payload = { range: '$50 - $100' };
    expect(
      profileReducer(undefined, { type: 'GET_MEN_PRICE_RANGE', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: { range: '$50 - $100' },
      mStyleCustom: null,
      mSchedule: null,
      mAllAddress: [],
      wBasicInfo: null,
      wStyleFit: null,
      wPriceRange: null,
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });

  it('should handle GET_MEN_STYLE_CUSTOM', () => {
    const payload = { customStyle: 'custom' };
    expect(
      profileReducer(undefined, { type: 'GET_MEN_STYLE_CUSTOM', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: null,
      mStyleCustom: { customStyle: 'custom' },
      mSchedule: null,
      mAllAddress: [],
      wBasicInfo: null,
      wStyleFit: null,
      wPriceRange: null,
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });

  it('should handle GET_MEN_SCHEDULE', () => {
    const payload = { schedule: 'Monday to Friday' };
    expect(
      profileReducer(undefined, { type: 'GET_MEN_SCHEDULE', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: null,
      mStyleCustom: null,
      mSchedule: { schedule: 'Monday to Friday' },
      mAllAddress: [],
      wBasicInfo: null,
      wStyleFit: null,
      wPriceRange: null,
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });

  it('should handle GET_WOMEN_BASIC_INFO', () => {
    const payload = { name: 'Jane Doe' };
    expect(
      profileReducer(undefined, { type: 'GET_WOMEN_BASIC_INFO', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: null,
      mStyleCustom: null,
      mSchedule: null,
      mAllAddress: [],
      wBasicInfo: { name: 'Jane Doe' },
      wStyleFit: null,
      wPriceRange: null,
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });

  it('should handle GET_WOMEN_STYLE_FIT', () => {
    const payload = { style: 'loose fit' };
    expect(
      profileReducer(undefined, { type: 'GET_WOMEN_STYLE_FIT', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: null,
      mStyleCustom: null,
      mSchedule: null,
      mAllAddress: [],
      wBasicInfo: null,
      wStyleFit: { style: 'loose fit' },
      wPriceRange: null,
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });

  it('should handle GET_WOMEN_PRICE_RANGE', () => {
    const payload = { range: '$20 - $50' };
    expect(
      profileReducer(undefined, { type: 'GET_WOMEN_PRICE_RANGE', payload })
    ).toEqual({
      loading: false,
      mBasicInfo: null,
      mStyleFit: null,
      mPriceRange: null,
      mStyleCustom: null,
      mSchedule: null,
      mAllAddress: [],
      wBasicInfo: null,
      wStyleFit: null,
      wPriceRange: { range: '$20 - $50' },
      wStyleCustom: null,
      wSchedule: null,
      wAllAddress: []
    });
  });
});
