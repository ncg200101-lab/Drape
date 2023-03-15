import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { GET_USED_SUMMARY } from './types';

export const getUsedSummary = (data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post(
      '/admsupplier/manage/supproduct/deduct/summary/tbllist',
      data
    );
    if (res.data) {
      DFnewLogger(res.data);
      dispatch({
        type: GET_USED_SUMMARY,
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
