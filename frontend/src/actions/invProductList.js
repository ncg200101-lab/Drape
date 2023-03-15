import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import {
  INV_GET_INDIVIDUAL_PRODUCT,
  INV_GET_PRODUCT_LIST,
  TOGGLE_PRODUCT
} from './types';

export const getProductList = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/invproduct/tbllist', data);
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_LIST,
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

export const getIndividualProduct = (data) => async (dispatch) => {
  try {
    dispatch({
      type: INV_GET_INDIVIDUAL_PRODUCT,
      payload: data
    });
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const deleteProduct = (values, gender, data) => async (dispatch) => {
  try {
    console.log(values);
    if (gender === 'girl' || gender === 'boy') {
      gender = 'kid';
    }
    const res = await Api.post(
      `/adminventory/manage/invproduct/delete/${gender}`,
      values
    );
    if (res.data === 'Inventory product is deleted') {
      setAlert(res.data, 'success');
      dispatch(getProductList(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const toggleProductActive = (values, gender) => async (dispatch) => {
  try {
    if (gender === 'girl' || gender === 'boy') {
      gender = 'kid';
    }
    const res = await Api.post(
      `/adminventory/manage/invproduct/toggleactive/${gender}`,
      values
    );
    if (
      res.data === 'Inventory product is activated' ||
      res.data === 'Inventory product is deactivated'
    ) {
      setAlert(res.data, 'success');
      dispatch({
        type: TOGGLE_PRODUCT,
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
