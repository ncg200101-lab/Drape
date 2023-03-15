import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import {
  INV_GET_PRODUCT_CATEGORIES,
  INV_GET_PROD_SUB_CATEGORY,
  INV_EDIT_PROD_SUB_CATEGORY
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

export const getProdSubCategory = (data) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/product/subcategory/rack/tbllist',
      data
    );
    if (res.data) {
      dispatch({
        type: INV_GET_PROD_SUB_CATEGORY,
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

export const addProdSubCategory = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/adminventory/manage/product/subcategory/rack/add',
      values
    );
    if (res.data) {
      setAlert('Product sub-category is added', 'success');
      dispatch(getProdSubCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editProdSubCategory = (values) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/product/subcategory/rack/edit',
      values
    );
    if (res.data) {
      setAlert('Product sub-category is updated', 'success');
      dispatch({
        type: INV_EDIT_PROD_SUB_CATEGORY,
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

export const deleteProdSubCategory = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post(
      '/adminventory/manage/product/subcategory/rack/delete',
      values
    );
    if (res.data === 'Product sub-category is deleted') {
      setAlert(res.data, 'success');
      dispatch(getProdSubCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
