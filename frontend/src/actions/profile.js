import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
  GET_MEN_BASIC_INFO,
  GET_MEN_PRICE_RANGE,
  GET_MEN_STYLE_FIT,
  GET_MEN_STYLE_CUSTOM,
  GET_WOMEN_BASIC_INFO,
  GET_WOMEN_STYLE_FIT,
  GET_WOMEN_PRICE_RANGE,
  GET_WOMEN_STYLE_CUSTOM,
  GET_WOMEN_SCHEDULE,
  GET_MEN_SCHEDULE,
  WOMEN_GET_ALL_ADDRESS,
  WOMEN_DELETE_ADDRESS,
  MEN_GET_ALL_ADDRESS,
  MEN_DELETE_ADDRESS
} from './types';

//========================= Select FIT =========================//

export const selectFit = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/user/selectfit', formData);
    if (res.data === 'men' || res.data === 'women') {
      setAlert('Your FIT is selected', 'success');
      dispatch(loadUser());
      let fitFor = res.data === 'women' ? 0 : 1;
      localStorage.setItem('fitFor', fitFor);
      navigate(`/welcome/basic-info/${res.data}`);
    } else {
      setAlert('Please select again', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

//============================= Men =============================//

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/men/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Basic Info of Men Fit Profile is saved'
 */
export const mEditBasicInfo = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/basicinfo/men/edit', formData);
    if (res.data === 'Basic Info of Men Fit Profile is saved') {
      if (navigate) {
        navigate('/welcome/style-fit/men');
      }
      setAlert('Basic Info is successfully saved.', 'success');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/basicinfo/men
 * @returns Object
 */
export const mGetBasicInfo = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/basicinfo/men');
    dispatch({
      type: GET_MEN_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/men/edit
 * @param {*} formData
 * @param {*} navigate
 * @route String : 'Style Fit of Men Fit Profile is saved'
 */
export const mEditStyleFit = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/stylefit/men/edit', formData);
    if (res.data === 'Style Fit of Men Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Style Fit is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/price-range/men');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/stylefit/men
 * @returns Object
 */
export const mGetStyleFit = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/stylefit/men');
    DFnewLogger(res);
    dispatch({
      type: GET_MEN_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/men/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Price Range of Men Fit Profile is saved'
 */
export const mEditPriceRange = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/pricerange/men/edit', formData);
    if (res.data === 'Price Range of Men Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Price Range is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/style-custom/men');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/pricerange/men
 * @returns Object
 */
export const mGetPriceRange = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/pricerange/men');
    DFnewLogger(res);
    dispatch({
      type: GET_MEN_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/men/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Custom Design & Brands of Men Fit Profile is saved'
 */
export const mEditStyleCustom = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post(
      '/fitprofile/customdsgnbrand/men/edit',
      formData
    );
    if (res.data === 'Custom Design & Brands of Men Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Style Custom is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/schedule');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/stylecustom/men
 * @returns Object
 */
export const mGetStyleCustom = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/customdsgnbrand/men');
    DFnewLogger(res);
    dispatch({
      type: GET_MEN_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

//============================= Women =============================//

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/women/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Basic Info of Men Fit Profile is saved'
 */
export const wEditBasicInfo = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/basicinfo/women/edit', formData);
    if (res.data === 'Basic Info of Women Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Basic Info is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/style-fit/women');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/basicinfo/women
 * @returns Object
 */
export const wGetBasicInfo = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/basicinfo/women');
    DFnewLogger(res);
    dispatch({
      type: GET_WOMEN_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/women/edit
 * @param {*} formData
 * @param {*} navigate
 * @route String : 'Style Fit of Women Fit Profile is saved'
 */
export const wEditStyleFit = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/stylefit/women/edit', formData);
    if (res.data === 'Style Fit of Women Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Style Fit is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/price-range/women');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/stylefit/women
 * @returns Object
 */
export const wGetStyleFit = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/stylefit/women');
    DFnewLogger(res);
    dispatch({
      type: GET_WOMEN_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/women/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Price Range of Women Fit Profile is saved'
 */
export const wEditPriceRange = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/pricerange/women/edit', formData);
    if (res.data === 'Price Range of Women Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Price Range is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/style-custom/women');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/pricerange/women
 * @returns Object
 */
export const wGetPriceRange = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/pricerange/women');
    DFnewLogger(res);
    dispatch({
      type: GET_WOMEN_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/women/edit
 * @param {*} formData
 * @param {*} navigate
 * @return String : 'Custom Design & Brands of Women Fit Profile is saved'
 */
export const wEditStyleCustom = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post(
      '/fitprofile/customdsgnbrand/women/edit',
      formData
    );
    if (res.data === 'Custom Design & Brands of Women Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Style Custom is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/schedule');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/stylecustom/women
 * @returns Object
 */
export const wGetStyleCustom = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/customdsgnbrand/women');
    DFnewLogger(res);
    dispatch({
      type: GET_WOMEN_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/schedule/women/edit
 * @param {*} formData
 * @param {*} navigate
 * @returns String: 'Schedule of Women Fit Profile is saved'
 */
export const wEditSchedule = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/schedule/women/edit', formData);
    if (res.data === 'Schedule of Women Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Schedule is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/reservation');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/schedule/women
 * @returns
 */
export const wGetSchedule = () => async (dispatch) => {
  try {
    const res = await Api.get('fitprofile/schedule/women');
    DFnewLogger(res);
    dispatch({
      type: GET_WOMEN_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/schedule/men/edit
 * @param {*} formData
 * @param {*} navigate
 * @returns String: 'Schedule of Men Fit Profile is saved'
 */
export const mEditSchedule = (formData, navigate) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/fitprofile/schedule/men/edit', formData);
    if (res.data === 'Schedule of Men Fit Profile is saved') {
      dispatch(loadUser());
      setAlert('Schedule is successfully saved.', 'success');
      if (navigate) {
        navigate('/welcome/reservation');
      }
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/schedule/men
 * @returns
 */
export const mGetSchedule = () => async (dispatch) => {
  try {
    const res = await Api.get('fitprofile/schedule/men');
    DFnewLogger(res);
    dispatch({
      type: GET_MEN_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/women/edit
 * @param {*} formData
 * @returns address
 */
export const wAddNewAddress = (formData) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    await Api.post('/fitprofile/shipaddress/women/edit', formData);
    if (formData._id) {
      setAlert('Ship Address is updated', 'success');
    } else {
      setAlert('Ship Address is added', 'success');
    }
    dispatch(loadUser());
    dispatch(wGetAllAddress());
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddresses/women/all
 * @returns String: 'Ship Address of Women Fit Profile is added'
 */
export const wGetAllAddress = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/shipaddresses/women/all');
    DFnewLogger(res);
    dispatch({
      type: WOMEN_GET_ALL_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/women/delete/:id
 * @param {*} id
 * @returns
 */
export const wDeleteAddress = (id) => async (dispatch) => {
  try {
    const res = await Api.post(`/fitprofile/shipaddress/women/delete/${id}`);
    if (res.data === 'Ship Address of Women Fit Profile is deleted') {
      dispatch({
        type: WOMEN_DELETE_ADDRESS,
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
 * @route dfnew/fitprofile/shipaddress/men/edit
 * @param {*} formData
 * @returns address
 */
export const mAddNewAddress = (formData) => async (dispatch) => {
  try {
    DFnewLogger(formData);
    await Api.post('/fitprofile/shipaddress/men/edit', formData);
    if (formData._id) {
      setAlert('Ship Address is updated', 'success');
    } else {
      setAlert('Ship Address is added', 'success');
    }
    dispatch(loadUser());
    dispatch(mGetAllAddress());
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddresses/men/all
 * @returns String: 'Ship Address of Men Fit Profile is added'
 */
export const mGetAllAddress = () => async (dispatch) => {
  try {
    const res = await Api.get('/fitprofile/shipaddresses/men/all');
    DFnewLogger(res);
    dispatch({
      type: MEN_GET_ALL_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/men/delete/:id
 * @param {*} id
 * @returns
 */
export const mDeleteAddress = (id) => async (dispatch) => {
  try {
    const res = await Api.post(`/fitprofile/shipaddress/men/delete/${id}`);
    if (res.data === 'Ship Address of Men Fit Profile is deleted') {
      dispatch({
        type: MEN_DELETE_ADDRESS,
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
 * @route dfnew/fitprofile/shipaddress/women/setdefault/:id
 * @param {*} id
 * @returns
 */
export const wSetDefaultAddress = (id) => async (dispatch) => {
  try {
    DFnewLogger('set default: ', id);
    await Api.post(`/fitprofile/shipaddress/women/setdefault/${id}`);
    dispatch(wGetAllAddress());
    setAlert('Address is setted in default', 'success');
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/men/setdefault/:id
 * @param {*} id
 * @returns
 */
export const mSetDefaultAddress = (id) => async (dispatch) => {
  try {
    DFnewLogger('set default: ', id);
    await Api.post(`/fitprofile/shipaddress/men/setdefault/${id}`);
    dispatch(mGetAllAddress());
    setAlert('Address is setted in default', 'success');
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
