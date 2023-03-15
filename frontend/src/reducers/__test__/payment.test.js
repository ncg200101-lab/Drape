import { GET_PAYMENT_METHODS, SET_PAYMENT_INTENT } from 'actions/types';
import { expect } from 'chai';

describe('paymentReducer', () => {
  const initialState = {
    loading: true,
    payMethods: []
  };

  it('should return the initial state', () => {
    expect(paymentReducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle GET_PAYMENT_METHODS', () => {
    const payload = [
      { id: 1, name: 'Visa' },
      { id: 2, name: 'Mastercard' }
    ];
    const expectedState = {
      loading: false,
      payMethods: payload
    };
    expect(
      paymentReducer(initialState, { type: GET_PAYMENT_METHODS, payload })
    ).to.deep.equal(expectedState);
  });
});
