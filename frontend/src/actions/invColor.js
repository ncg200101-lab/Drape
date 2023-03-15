import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { INV_GET_COLOR, INV_EDIT_COLOR } from './types';

export const getColor = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/color/tbllist', data);
    if (res.data) {
      dispatch({
        type: INV_GET_COLOR,
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

export const addColor = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/adminventory/manage/color/add', values);
    if (res.data) {
      setAlert('Color is added', 'success');
      dispatch(getColor(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editColor = (values) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/color/edit', values);
    if (res.data) {
      setAlert('Color is updated', 'success');
      dispatch({
        type: INV_EDIT_COLOR,
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

export const deleteColor = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post('/adminventory/manage/color/delete', values);
    if (res.data === 'Color is deleted') {
      setAlert('Color is deleted', 'success');
      dispatch(getColor(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
