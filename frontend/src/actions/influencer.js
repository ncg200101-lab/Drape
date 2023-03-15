import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { GET_INFLUENCER, EDIT_INFLUENCER } from './types';

export const getInfluencer = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/admmain/manage/influencer/tbllist', data);
    if (res.data) {
      dispatch({
        type: GET_INFLUENCER,
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

export const addInfluencer = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/admmain/manage/influencer/create', values);
    if (res.data.includes('Influencer is created')) {
      setAlert(res.data, 'success');
      dispatch(getInfluencer(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editInfluencer = (values) => async (dispatch) => {
  try {
    const res = await Api.post('/admmain/manage/influencer/edit', values);
    if (res.data) {
      setAlert('Influencer info is updated', 'success');
      dispatch({
        type: EDIT_INFLUENCER,
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

export const deleteInfluencer = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post('/admmain/manage/influencer/delete', values);
    if (res.data === 'Influencer entity is deleted') {
      setAlert('Influencer info is deleted', 'success');
      dispatch(getInfluencer(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
