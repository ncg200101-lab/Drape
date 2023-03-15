import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { GET_PAYMENT_METHODS, SET_LOADING, SET_PAYMENT_INTENT } from './types';

describe('attachPaymentMethod', () => {
  it('should call the API and set an alert on success', async () => {
    const formData = {};
    const navigate = jest.fn();
    const res = { data: 'Payment method attached successfully' };
    Api.post = jest.fn().mockResolvedValue(res);
    setAlert = jest.fn();
    await attachPaymentMethod(formData, navigate);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/paymethod/attach',
      formData
    );
    expect(navigate).toHaveBeenCalledWith('/welcome/payment');
    expect(setAlert).toHaveBeenCalledWith(res.data, 'success');
  });

  it('should call the API and log an error on failure', async () => {
    const formData = {};
    const navigate = jest.fn();
    const err = new Error('Something went wrong');
    Api.post = jest.fn().mockRejectedValue(err);
    CatchError = jest.fn();
    DFnewLogger = jest.fn();
    await attachPaymentMethod(formData, navigate);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/paymethod/attach',
      formData
    );
    expect(navigate).not.toHaveBeenCalled();
    expect(CatchError).toHaveBeenCalledWith(err);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});

describe('getPaymentMethods', () => {
  it('should call the API and dispatch the response', async () => {
    const res = { data: { data: 'some data' } };
    Api.get = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await getPaymentMethods()(dispatch);
    expect(Api.get).toHaveBeenCalledWith('/payment/stripe/paymethods/list');
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_PAYMENT_METHODS,
      payload: res?.data?.data
    });
  });

  it('should call the API and log an error on failure', async () => {
    const err = new Error('Something went wrong');
    Api.get = jest.fn().mockRejectedValue(err);
    CatchError = jest.fn();
    DFnewLogger = jest.fn();
    const dispatch = jest.fn();
    await getPaymentMethods()(dispatch);
    expect(Api.get).toHaveBeenCalledWith('/payment/stripe/paymethods/list');
    expect(dispatch).not.toHaveBeenCalled();
    expect(CatchError).toHaveBeenCalledWith(err);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});

describe('createPayIntentOfStyleFee', () => {
  it('should call the API and dispatch the response', async () => {
    const data = {};
    const navigate = jest.fn();
    const res = { data: { status: 'requires_confirmation' } };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    confirmPayIntent = jest.fn();
    setAlert = jest.fn();
    await createPayIntentOfStyleFee(data, navigate)(dispatch);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/payintent/stylingfee/create',
      data
    );
    expect(dispatch).toHaveBeenCalledWith({ type: SET_LOADING });
    expect(confirmPayIntent).toHaveBeenCalledWith(
      { paymentMethod: data.paymentMethod, paymentIntent: res.data.id },
      navigate
    );
  });

  it('should call the API and set an alert on failure', async () => {
    const data = {};
    const navigate = jest.fn();
    const err = {
      response: {
        status: 422,
        data: { errors: ['Invalid value', 'Something went wrong'] }
      }
    };
    Api.post = jest.fn().mockRejectedValue(err);
    const dispatch = jest.fn();
    setAlert = jest.fn();
    await createPayIntentOfStyleFee(data, navigate)(dispatch);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/payintent/stylingfee/create',
      data
    );
    expect(dispatch).not.toHaveBeenCalled();
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });
});

describe('confirmPayIntent', () => {
  it('should call the API and dispatch the response', async () => {
    const data = {};
    const navigate = jest.fn();
    const res = { data: { status: 'succeeded' } };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    addWomenBillingInfo = jest.fn();
    addMenBillingInfo = jest.fn();
    addGirlBillingInfo = jest.fn();
    addBoyBillingInfo = jest.fn();
    localStorage.getItem = jest.fn().mockReturnValue('0');
    await confirmPayIntent(data, navigate)(dispatch);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/payintent/confirm',
      data
    );
    expect(dispatch).toHaveBeenCalledWith({ type: SET_LOADING });
    expect(navigate).toHaveBeenCalledWith('/payment-success');
    expect(addWomenBillingInfo).toHaveBeenCalledWith(data);
  });

  it('should call the API and log an error on failure', async () => {
    const data = {};
    const navigate = jest.fn();
    const err = new Error('Something went wrong');
    Api.post = jest.fn().mockRejectedValue(err);
    CatchError = jest.fn();
    DFnewLogger = jest.fn();
    const dispatch = jest.fn();
    await confirmPayIntent(data, navigate)(dispatch);
    expect(Api.post).toHaveBeenCalledWith(
      '/payment/stripe/payintent/confirm',
      data
    );
    expect(navigate).not.toHaveBeenCalled();
    expect(CatchError).toHaveBeenCalledWith(err);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});
