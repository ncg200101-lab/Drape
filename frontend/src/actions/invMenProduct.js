import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';
import {
  INV_GET_PRODUCT_BRANDS,
  INV_GET_PRODUCT_CATEGORIES,
  INV_GET_PRODUCT_COLORS,
  INV_GET_PRODUCT_SUB_CATEGORIES
} from './types';

export const getProductCategories = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/product/categories');
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_CATEGORIES,
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

export const getProductColors = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/colors');
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_COLORS,
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

export const getProductBrands = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/brand/staff/getbrands');
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_BRANDS,
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

export const getProductSubCategories = (categoryId) => async (dispatch) => {
  try {
    const res = await Api.get(
      `/adminventory/manage/product/${categoryId}/subcategories`
    );
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_SUB_CATEGORIES,
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

export const addMenProduct = async (value, actions) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/invproduct/add/men',
      value
    );
    if (res.data) {
      actions.resetForm();
      setAlert('Inventory product is added', 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editMenProduct = async (value, actions, navigate) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/invproduct/edit/men',
      value
    );
    if (res.data) {
      actions.resetForm();
      navigate('/dfinventory/product-list');
      setAlert('Inventory product is updated', 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
