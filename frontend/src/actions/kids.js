import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
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
} from './types';

/**
 * @method POST
 * @route dfnew/user/kids/add/:order
 * @param {*} order
 * @returns  String: 'FIRST, SECOND, ...'
 */
export const addNewKid = (order, navigate) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.post(`/user/kids/add/${order}`);
    DFnewLogger(res);
    setAlert(`YOUR ${res.data} CHILD is added.`, 'success');
    dispatch(loadUser());
    localStorage.setItem('order', order);
    navigate(`/welcome/basic-info/kids`);
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/basicinfo/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 * @returns String: 'Basic Info is successfully saved'
 */
export const kEditBasicInfo =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/basicinfo/${order}/edit`,
        formData
      );
      if (res.data === 'Basic Info of Kid Fit Profile is saved') {
        if (navigate) {
          navigate(
            `/welcome/style-fit/kids/${
              formData.lookingFor === 0 ? 'girl' : 'boy'
            }`
          );
        }
        setAlert('Basic Info is successfully saved', 'success');
        localStorage.setItem('fitFor', formData.lookingFor + 3);
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/basicinfo/:order
 * @param {*} order
 * @returns
 */
export const kGetBasicInfo = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/basicinfo/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit/girl/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 */
export const kgEditStyleFit =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/stylefit/girl/${order}/edit`,
        formData
      );
      if (res.data === 'Style Fit of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/price-range/kids/girl');
        }
        setAlert('Style Fit is successfully saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/stylefit/girl/:order
 * @param {*} order
 * @returns
 */
export const kgGetStyleFit = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/stylefit/girl/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_GIRL_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit/boy/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 */
export const kbEditStyleFit =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/stylefit/boy/${order}/edit`,
        formData
      );
      if (res.data === 'Style Fit of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/price-range/kids/boy');
        }
        setAlert('Style Fit is successfully saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/stylefit/boy/:order
 * @param {*} order
 * @returns
 */
export const kbGetStyleFit = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/stylefit/boy/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_BOY_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/pricerange/girl/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 */
export const kgEditPriceRange =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/pricerange/girl/${order}/edit`,
        formData
      );
      if (res.data === 'Price Range of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/style-custom/kids/girl');
        }
        setAlert('Price Range is successfully saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/pricerange/girl/:order
 * @param {*} order
 * @returns
 */
export const kgGetPriceRange = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/pricerange/girl/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_GIRL_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/pricerange/boy/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 */
export const kbEditPriceRange =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/pricerange/boy/${order}/edit`,
        formData
      );
      if (res.data === 'Price Range of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/style-custom/kids/boy');
        }
        setAlert('Price Range is successfully saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/pricerange/boy/:order
 * @param {*} order
 * @returns
 */
export const kbGetPriceRange = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/pricerange/boy/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_BOY_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/customdsgnbrand/girl/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 * @returns String: 'Custom Design & Brands of Kid Fit Profile is saved'
 */
export const kgEditStyleCustom =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/customdsgnbrand/girl/${order}/edit`,
        formData
      );
      if (res.data === 'Custom Design & Brands of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/schedule');
        }
        setAlert('Custom Design & Brands is saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/customdsgnbrand/girl/:order
 * @param {*} order
 * @returns
 */
export const kgGetStyleCustom = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/customdsgnbrand/girl/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_GIRL_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/customdsgnbrand/boy/:order/edit
 * @param {*} formData
 * @param {*} order
 * @param {*} navigate
 */
export const kbEditStyleCustom =
  (formData, order, navigate) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/customdsgnbrand/boy/${order}/edit`,
        formData
      );
      if (res.data === 'Custom Design & Brands of Kid Fit Profile is saved') {
        if (navigate) {
          navigate('/welcome/schedule');
        }
        setAlert('Custom Design & Brands is saved.', 'success');
        dispatch(loadUser());
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

/**
 * @method GET
 * @route dfnew/kidsprofile/customdsgnbrand/boy/:order
 * @param {*} order
 * @returns
 */
export const kbGetStyleCustom = (order) => async (dispatch) => {
  try {
    DFnewLogger(order);
    const res = await Api.get(`/kidsprofile/customdsgnbrand/boy/${order}`);
    DFnewLogger(res.data);
    dispatch({
      type: GET_KIDS_BOY_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/schedule/girl/:order/edit
 * @param {*} formData
 * @param {*} navigate
 * @returns String: 'Schedule of Kid Fit Profile is saved'
 */
export const kgEditSchedule =
  (formData, navigate, order) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/schedule/girl/${order}/edit`,
        formData
      );
      if (res.data === 'Schedule of Kid Fit Profile is saved') {
        dispatch(loadUser());
        setAlert('Schedule is successfully saved.', 'success');
        if (navigate) {
          navigate('/welcome/reservation');
        }
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

/**
 * @method GET
 * @route dfnew/kidsprofile/schedule/girl/:order
 * @returns
 */
export const kgGetSchedule = (order) => async (dispatch) => {
  try {
    const res = await Api.get(`/kidsprofile/schedule/girl/${order}`);
    DFnewLogger('schedule res: ', res);
    dispatch({
      type: KIDS_GIRL_GET_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/schedule/boy/:order/edit
 * @param {*} formData
 * @param {*} navigate
 * @returns String: 'Schedule of Kid Fit Profile is saved'
 */
export const kbEditSchedule =
  (formData, navigate, order) => async (dispatch) => {
    try {
      DFnewLogger(formData);
      const res = await Api.post(
        `/kidsprofile/schedule/boy/${order}/edit`,
        formData
      );
      if (res.data === 'Schedule of Kid Fit Profile is saved') {
        dispatch(loadUser());
        setAlert('Schedule is successfully saved.', 'success');
        if (navigate) {
          navigate('/welcome/reservation');
        }
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

/**
 * @method GET
 * @route dfnew/kidsprofile/schedule/boy/:order
 * @returns
 */
export const kbGetSchedule = (order) => async (dispatch) => {
  try {
    const res = await Api.get(`/kidsprofile/schedule/boy/${order}`);
    DFnewLogger('schedule res: ', res);
    dispatch({
      type: KIDS_BOY_GET_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/edit
 * @param {*} formData
 * @param {*} order
 * @returns
 */
export const kgAddNewAddress = (formData, order) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    await Api.post(`/kidsprofile/shipaddress/girl/${order}/edit`, formData);
    if (formData._id) {
      setAlert('Ship Address is updated', 'success');
    } else {
      setAlert('Ship Address is added', 'success');
    }
    dispatch(kgGetAllAddress(order));
    dispatch(loadUser());
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddresses/girl/:order/all
 * @param {*} order
 * @returns
 */
export const kgGetAllAddress = (order) => async (dispatch) => {
  try {
    const res = await Api.get(`/kidsprofile/shipaddresses/girl/${order}/all`);
    DFnewLogger(res);
    dispatch({
      type: KIDS_GIRL_GET_ALL_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/delete/:id
 * @param {*} order
 * @param {*} id
 * @returns String: 'Ship Address of Kid Fit Profile is deleted'
 */
export const kgDeleteAddress = (id, order) => async (dispatch) => {
  try {
    const res = await Api.post(
      `/kidsprofile/shipaddress/girl/${order}/delete/${id}`
    );
    if (res.data === 'Ship Address of Kid Fit Profile is deleted') {
      dispatch({
        type: KIDS_GIRL_DELETE_ADDRESS,
        payload: id
      });
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/edit
 * @param {*} formData
 * @param {*} order
 * @returns address
 */
export const kbAddNewAddress = (formData, order) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    await Api.post(`/kidsprofile/shipaddress/boy/${order}/edit`, formData);
    if (formData._id) {
      setAlert('Ship Address is updated', 'success');
    } else {
      setAlert('Ship Address is added', 'success');
    }
    dispatch(kbGetAllAddress(order));
    dispatch(loadUser());
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddresses/boy/:order/all
 * @param {*} order
 * @returns
 */
export const kbGetAllAddress = (order) => async (dispatch) => {
  try {
    const res = await Api.get(`/kidsprofile/shipaddresses/boy/${order}/all`);
    DFnewLogger(res);
    dispatch({
      type: KIDS_BOY_GET_ALL_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/delete/:id
 * @param {*} order
 * @param {*} id
 * @returns String: 'Ship Address of Kid Fit Profile is deleted'
 */
export const kbDeleteAddress = (id, order) => async (dispatch) => {
  try {
    const res = await Api.post(
      `/kidsprofile/shipaddress/boy/${order}/delete/${id}`
    );
    if (res.data === 'Ship Address of Kid Fit Profile is deleted') {
      dispatch({
        type: KIDS_BOY_DELETE_ADDRESS,
        payload: id
      });
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/setdefault/:id
 * @param {*} id
 * @returns
 */
export const kgSetDefaultAddress = (id, order) => async (dispatch) => {
  try {
    DFnewLogger('set default: ', id);
    await Api.post(`/kidsprofile/shipaddress/girl/${order}/setdefault/${id}`);
    dispatch(kgGetAllAddress());
    setAlert('Address is setted in default', 'success');
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/setdefault/:id
 * @param {*} id
 * @returns
 */
export const kbSetDefaultAddress = (id, order) => async (dispatch) => {
  try {
    DFnewLogger('set default: ', id);
    await Api.post(`/kidsprofile/shipaddress/boy/${order}/setdefault/${id}`);
    dispatch(kbGetAllAddress());
    setAlert('Address is setted in default', 'success');
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
