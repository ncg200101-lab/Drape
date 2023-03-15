import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';
import { GET_CATEGORY, EDIT_CATEGORY } from './types';

export const getCategory = (data) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/admsupplier/manage/supproduct/category/tbllist',
      data
    );
    if (res.data) {
      dispatch({
        type: GET_CATEGORY,
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

export const addCategory = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post(
      '/admsupplier/manage/supproduct/category/add',
      values
    );
    if (res.data) {
      setAlert('New Category is added', 'success');
      dispatch(getCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editCategory = (values) => async (dispatch) => {
  try {
    const res = await Api.post(
      '/admsupplier/manage/supproduct/category/edit',
      values
    );
    if (res.data) {
      setAlert('Category is updated', 'success');
      dispatch({
        type: EDIT_CATEGORY,
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

export const deleteCategory = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post(
      '/admsupplier/manage/supproduct/category/delete',
      values
    );
    if (res.data === 'Supplier product category is deleted') {
      setAlert(res.data, 'success');
      dispatch(getCategory(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
