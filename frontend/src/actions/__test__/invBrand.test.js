import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import {
  INV_EDIT_BRAND,
  INV_GET_BRAND,
  INV_GET_COUNT,
  INV_TOGGLE_BRAND
} from './types';

describe('getCount', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockDispatch = jest.fn();
    const mockData = { data: 'mockData' };
    Api.get = jest.fn(() => Promise.resolve({ data: mockData }));
    await getCount()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_GET_COUNT,
      payload: mockData
    });
  });
});

describe('getBrand', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockDispatch = jest.fn();
    const mockData = { data: 'mockData' };
    Api.post = jest.fn(() => Promise.resolve({ data: mockData }));
    await getBrand()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_GET_BRAND,
      payload: mockData
    });
  });
});

describe('addBrand', () => {
  it('should call setAlert with the correct arguments', async () => {
    const mockValues = { values: 'mockValues' };
    const mockMessage = 'Brand staff is created';
    Api.post = jest.fn(() => Promise.resolve({ data: mockMessage }));
    setAlert = jest.fn();
    await addBrand(mockValues);
    expect(setAlert).toHaveBeenCalledWith(mockMessage, 'success');
  });
});

describe('changeBrandPwd', () => {
  it('should call setAlert with the correct arguments', async () => {
    const mockValues = { values: 'mockValues' };
    const mockMessage = 'Password is changed';
    Api.post = jest.fn(() => Promise.resolve({ data: mockMessage }));
    setAlert = jest.fn();
    await changeBrandPwd(mockValues);
    expect(setAlert).toHaveBeenCalledWith(mockMessage, 'success');
  });
});

describe('editBrand', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockDispatch = jest.fn();
    const mockData = {
      data: { msg: 'Brand staff info is updated', data: 'mockData' }
    };
    Api.post = jest.fn(() => Promise.resolve(mockData));
    await editBrand()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_EDIT_BRAND,
      payload: mockData.data.data
    });
  });
});

describe('deleteBrand', () => {
  it('should call setAlert with the correct arguments', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    const mockMessage = 'Brand staff account is deleted';
    Api.post = jest.fn(() => Promise.resolve({ data: mockMessage }));
    setAlert = jest.fn();
    await deleteBrand(mockValues, mockData);
    expect(setAlert).toHaveBeenCalledWith(mockMessage, 'success');
  });
});

describe('toggleBrandActive', () => {
  it('should call setAlert with the correct arguments', async () => {
    const mockValues = { values: 'mockValues' };
    const mockMessage = 'Brand staff account is activated';
    Api.post = jest.fn(() => Promise.resolve({ data: mockMessage }));
    setAlert = jest.fn();
    await toggleBrandActive(mockValues);
    expect(setAlert).toHaveBeenCalledWith(mockMessage, 'success');
  });
});
