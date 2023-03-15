import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import {
  INV_GET_PRODUCT_CATEGORIES,
  INV_GET_PROD_SUB_CATEGORY,
  INV_EDIT_PROD_SUB_CATEGORY
} from './types';

describe('getProductCategories', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDispatch = jest.fn();
    Api.get = jest.fn(() => Promise.resolve({ data: mockData }));
    await getProductCategories()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_GET_PRODUCT_CATEGORIES,
      payload: mockData
    });
  });
});

describe('getProdSubCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDispatch = jest.fn();
    Api.post = jest.fn(() => Promise.resolve({ data: mockData }));
    await getProdSubCategory()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_GET_PROD_SUB_CATEGORY,
      payload: mockData
    });
  });
});

describe('addProdSubCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDispatch = jest.fn();
    Api.post = jest.fn(() => Promise.resolve({ data: mockData }));
    await addProdSubCategory()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_EDIT_PROD_SUB_CATEGORY,
      payload: mockData
    });
  });
});

describe('editProdSubCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDispatch = jest.fn();
    Api.post = jest.fn(() => Promise.resolve({ data: mockData }));
    await editProdSubCategory()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_EDIT_PROD_SUB_CATEGORY,
      payload: mockData
    });
  });
});

describe('deleteProdSubCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDispatch = jest.fn();
    Api.post = jest.fn(() => Promise.resolve({ data: mockData }));
    await deleteProdSubCategory()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: INV_GET_PROD_SUB_CATEGORY,
      payload: mockData
    });
  });
});
