import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { GET_USED_DETAILS } from './types';

describe('getUsedDetails', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('should call DFnewLogger with data', async () => {
    const data = {};
    await getUsedDetails(data)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(data);
  });

  it('should call Api.post with correct params', async () => {
    const data = {};
    await getUsedDetails(data)(dispatch);
    expect(Api.post).toHaveBeenCalledWith(
      '/admsupplier/manage/supproduct/deduct/details/tbllist',
      data
    );
  });

  it('should call dispatch with correct params if res.data is truthy', async () => {
    const data = {};
    Api.post.mockResolvedValue({ data: {} });
    await getUsedDetails(data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_USED_DETAILS,
      payload: {}
    });
  });

  it('should call setAlert with correct params if res.data is falsy', async () => {
    const data = {};
    Api.post.mockResolvedValue({});
    await getUsedDetails(data)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call CatchError with err if an error occurs', async () => {
    const data = {};
    const err = new Error('test');
    Api.post.mockRejectedValue(err);
    await getUsedDetails(data)(dispatch);
    expect(CatchError).toHaveBeenCalledWith(err);
  });
});
