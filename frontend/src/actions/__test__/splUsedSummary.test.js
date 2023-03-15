import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { GET_USED_SUMMARY } from './types';

describe('getUsedSummary', () => {
  it('should dispatch an action with type GET_USED_SUMMARY and payload of res.data when the API call is successful', async () => {
    const data = {};
    const res = { data: {} };
    const dispatch = jest.fn();
    Api.post = jest.fn(() => Promise.resolve(res));
    await getUsedSummary(data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_USED_SUMMARY,
      payload: res.data
    });
  });

  it('should call setAlert with "Something went wrong" and "error" when the API call fails', async () => {
    const data = {};
    const dispatch = jest.fn();
    Api.post = jest.fn(() => Promise.reject());
    setAlert = jest.fn();
    await getUsedSummary(data)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });
});
