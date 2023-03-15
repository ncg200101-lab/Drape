import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import {
  INV_EDIT_BRAND,
  INV_GET_BRAND,
  INV_GET_COUNT,
  INV_TOGGLE_BRAND
} from './types';

export const getCount = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/brand/staff/count');
    if (res.data) {
      dispatch({
        type: INV_GET_COUNT,
        payload: res.data
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const getBrand = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await Api.post(
      '/adminventory/manage/brand/staff/tbllist',
      data
    );
    if (res.data) {
      dispatch({
        type: INV_GET_BRAND,
        payload: res.data
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addBrand = (values) => async (disaptch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/adminventory/manage/brand/staff/create',
      values
    );
    if (res.data.includes('Brand staff is created')) {
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const changeBrandPwd = async (values) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/adminventory/manage/brand/staff/changepwd',
      values
    );
    if (res.data.includes('Password is changed')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editBrand = (values) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/brand/staff/edit', values);
    if (res?.data?.msg.includes('Brand staff info is updated')) {
      setAlert(res.data.msg, 'success');
      DFnewLogger(res.data);
      dispatch({
        type: INV_EDIT_BRAND,
        payload: res.data.data
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const deleteBrand = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post(
      '/adminventory/manage/brand/staff/delete',
      values
    );
    if (res.data === 'Brand staff account is deleted') {
      setAlert(res.data, 'success');
      dispatch(getBrand(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const toggleBrandActive = (values) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post(
      '/adminventory/manage/brand/staff/toggleactive',
      values
    );
    if (
      res.data === 'Brand staff account is activated' ||
      res.data === 'Brand staff account is deactivated'
    ) {
      setAlert(res.data, 'success');
      dispatch({
        type: INV_TOGGLE_BRAND,
        payload: values
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
