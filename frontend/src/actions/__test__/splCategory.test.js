// need checks
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';
import { GET_CATEGORY, EDIT_CATEGORY } from './types';

describe('getCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const data = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await getCategory(data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_CATEGORY,
      payload: res.data
    });
  });

  it('should call setAlert if there is no response data', async () => {
    const data = {};
    const res = {};
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await getCategory(data)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger if there is an error', async () => {
    const data = {};
    const err = { response: { status: 422 } };
    Api.post = jest.fn().mockRejectedValue(err);
    const dispatch = jest.fn();
    await getCategory(data)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});

describe('addCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const data = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await addCategory(values, data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(getCategory(data));
  });

  it('should call setAlert if there is no response data', async () => {
    const values = {};
    const data = {};
    const res = {};
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await addCategory(values, data)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger if there is an error', async () => {
    const values = {};
    const data = {};
    const err = { response: { status: 422 } };
    Api.post = jest.fn().mockRejectedValue(err);
    const dispatch = jest.fn();
    await addCategory(values, data)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});

describe('editCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const res = { data: {} };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await editCategory(values)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: EDIT_CATEGORY,
      payload: res.data
    });
  });

  it('should call setAlert if there is no response data', async () => {
    const values = {};
    const res = {};
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await editCategory(values)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger if there is an error', async () => {
    const values = {};
    const err = { response: { status: 422 } };
    Api.post = jest.fn().mockRejectedValue(err);
    const dispatch = jest.fn();
    await editCategory(values)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});

describe('deleteCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const values = {};
    const data = {};
    const res = { data: 'Supplier product category is deleted' };
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await deleteCategory(values, data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(getCategory(data));
  });

  it('should call setAlert if there is no response data', async () => {
    const values = {};
    const data = {};
    const res = {};
    Api.post = jest.fn().mockResolvedValue(res);
    const dispatch = jest.fn();
    await deleteCategory(values, data)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger if there is an error', async () => {
    const values = {};
    const data = {};
    const err = { response: { status: 422 } };
    Api.post = jest.fn().mockRejectedValue(err);
    const dispatch = jest.fn();
    await deleteCategory(values, data)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(err);
  });
});
