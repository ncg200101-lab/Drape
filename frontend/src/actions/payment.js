import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { GET_PAYMENT_METHODS, SET_LOADING, SET_PAYMENT_INTENT } from './types';

export const attachPaymentMethod = async (formData, navigate) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/payment/stripe/paymethod/attach', formData);
    if (res.data === 'Payment method attached successfully') {
      navigate('/welcome/payment');
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const getPaymentMethods = () => async (dispatch) => {
  try {
    const res = await Api.get('/payment/stripe/paymethods/list');
    DFnewLogger(res);
    dispatch({
      type: GET_PAYMENT_METHODS,
      payload: res?.data?.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const createPayIntentOfStyleFee =
  (data, navigate) => async (dispatch) => {
    try {
      DFnewLogger(new Date());
      DFnewLogger(data);
      const res = await Api.post(
        '/payment/stripe/payintent/stylingfee/create',
        data
      );
      if (res.data.status === 'requires_confirmation') {
        dispatch(
          confirmPayIntent(
            { paymentMethod: data.paymentMethod, paymentIntent: res.data.id },
            navigate
          )
        );
      } else {
        setAlert('Something went wrong', 'error');
      }
    } catch (err) {
      DFnewLogger(err);
      if (err?.response?.status === 422) {
        const errmsgs = err?.response?.data?.errors;
        if (errmsgs) {
          errmsgs.forEach((error) => {
            if (error !== 'Invalid value') {
              setAlert(error, 'error');
            }
          });
        }
      } else {
        const errmsg = err?.response?.data?.msg;
        if (errmsg) {
          setAlert(errmsg, 'error');
        }
      }
    }
  };

export const confirmPayIntent = (data, navigate) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/payment/stripe/payintent/confirm', data);
    DFnewLogger(res);
    if (res.data.status === 'succeeded') {
      dispatch({ type: SET_LOADING });
      navigate('/payment-success');
      DFnewLogger(new Date());
      const fitFor = localStorage.getItem('fitFor');
      const order = localStorage.getItem('order');
      if (fitFor === '0') {
        dispatch(addWomenBillingInfo(data));
      } else if (fitFor === '1') {
        dispatch(addMenBillingInfo(data));
      } else if (fitFor === '3') {
        dispatch(addGirlBillingInfo(data, order));
      } else if (fitFor === '4') {
        dispatch(addBoyBillingInfo(data, order));
      } else {
        setAlert('Something went wrong', 'error');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addMenBillingInfo = (data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/fitprofile/billinginfo/men/add', data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addWomenBillingInfo = (data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/fitprofile/billinginfo/women/add', data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addGirlBillingInfo = (data, order) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post(
      `/kidsprofile/billinginfo/girl/${order}/add`,
      data
    );
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addBoyBillingInfo = (data, order) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post(
      `/kidsprofile/billinginfo/boy/${order}/add`,
      data
    );
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
