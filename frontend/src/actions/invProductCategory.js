import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { INV_GET_PRODUCT_CATEGORY, INV_EDIT_PRODUCT_CATEGORY } from './types';

export const getProductCategory = (data) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/product/category/tbllist',
      data
    );
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_CATEGORY,
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

export const addProductCategory = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/adminventory/manage/product/category/add',
      values
    );
    if (res.data) {
      setAlert('Product category is added', 'success');
      dispatch(getProductCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editProductCategory = (values) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/product/category/edit',
      values
    );
    if (res.data) {
      setAlert('Product category is updated', 'success');
      dispatch({
        type: INV_EDIT_PRODUCT_CATEGORY,
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

export const deleteProductCategory = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post(
      '/adminventory/manage/product/category/delete',
      values
    );
    if (res.data === 'Product category is deleted') {
      setAlert(res.data, 'success');
      dispatch(getProductCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
