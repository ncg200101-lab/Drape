import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { INV_GET_COLOR, INV_EDIT_COLOR } from './types';

describe('getColor', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const data = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await getColor(data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: INV_GET_COLOR,
      payload: res.data
    });
  });
});

describe('addColor', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const data = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await addColor(values, data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: INV_GET_COLOR,
      payload: res.data
    });
  });
});

describe('editColor', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await editColor(values)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: INV_EDIT_COLOR,
      payload: res.data
    });
  });
});

describe('deleteColor', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const data = {};
    const res = { data: 'Color is deleted' };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await deleteColor(values, data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: INV_GET_COLOR,
      payload: res.data
    });
  });
});
