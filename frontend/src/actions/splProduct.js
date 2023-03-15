import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';
import { GET_PROD_CATEGORY, GET_PRODUCT } from './types';

export const getProductCategory = () => async (dispatch) => {
  try {
    const res = await Api.get('/admsupplier/manage/supproduct/categories');
    if (res.data) {
      dispatch({
        type: GET_PROD_CATEGORY,
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

export const getProduct = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/admsupplier/manage/supproduct/tbllist', data);
    if (res.data) {
      console.log(res.data);
      dispatch({
        type: GET_PRODUCT,
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

export const addProduct = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/admsupplier/manage/supproduct/add', values);
    if (res.data) {
      setAlert('New Product is added', 'success');
      dispatch(getProduct(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editProduct = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/admsupplier/manage/supproduct/edit', values);
    if (res.data) {
      setAlert('Supplier product is updated', 'success');
      dispatch(getProduct(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addStock = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/admsupplier/manage/supproduct/addmore/stock',
      values
    );
    if (res.data) {
      setAlert('Added more stock to supplier products', 'success');
      dispatch(getProduct(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const manualDeduct = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/admsupplier/manage/supproduct/manualdeduct/stock',
      values
    );
    if (res.data) {
      setAlert('Deducted stock manually from supplier products', 'success');
      dispatch(getProduct(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const deleteProduct = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post('/admsupplier/manage/supproduct/delete', values);
    if (res.data === 'Supplier product is deleted') {
      setAlert(res.data, 'success');
      dispatch(getProduct(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
