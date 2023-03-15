// not completed
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';
import { GET_PROD_CATEGORY, GET_PRODUCT } from './types';

describe('getProductCategory', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    Api.get = jest.fn().mockResolvedValue({ data: mockData });
    const dispatch = jest.fn();
    await getProductCategory()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_PROD_CATEGORY,
      payload: mockData
    });
  });

  it('should call setAlert if no data is returned', async () => {
    Api.get = jest.fn().mockResolvedValue({});
    const dispatch = jest.fn();
    await getProductCategory()(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger and CatchError if an error occurs', async () => {
    const mockError = new Error('mockError');
    Api.get = jest.fn().mockRejectedValue(mockError);
    const dispatch = jest.fn();
    await getProductCategory()(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(mockError);
    expect(CatchError).toHaveBeenCalledWith(mockError);
  });
});

describe('getProduct', () => {
  it('should dispatch an action with the correct type and payload', async () => {
    const mockData = { data: 'mockData' };
    const mockDataInput = { input: 'mockDataInput' };
    Api.post = jest.fn().mockResolvedValue({ data: mockData });
    const dispatch = jest.fn();
    await getProduct(mockDataInput)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_PRODUCT,
      payload: mockData
    });
  });

  it('should call setAlert if no data is returned', async () => {
    const mockDataInput = { input: 'mockDataInput' };
    Api.post = jest.fn().mockResolvedValue({});
    const dispatch = jest.fn();
    await getProduct(mockDataInput)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger and CatchError if an error occurs', async () => {
    const mockDataInput = { input: 'mockDataInput' };
    const mockError = new Error('mockError');
    Api.post = jest.fn().mockRejectedValue(mockError);
    const dispatch = jest.fn();
    await getProduct(mockDataInput)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(mockError);
    expect(CatchError).toHaveBeenCalledWith(mockError);
  });
});

describe('addProduct', () => {
  it('should call setAlert if data is returned', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    Api.post = jest
      .fn()
      .mockResolvedValue({ data: 'Supplier product is added' });
    const dispatch = jest.fn();
    await addProduct(mockValues, mockData)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('New Product is added', 'success');
  });

  it('should call setAlert if no data is returned', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    Api.post = jest.fn().mockResolvedValue({});
    const dispatch = jest.fn();
    await addProduct(mockValues, mockData)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger and CatchError if an error occurs', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    const mockError = new Error('mockError');
    Api.post = jest.fn().mockRejectedValue(mockError);
    const dispatch = jest.fn();
    await addProduct(mockValues, mockData)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(mockError);
    expect(CatchError).toHaveBeenCalledWith(mockError);
  });
});

describe('editProduct', () => {
  it('should call setAlert if data is returned', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    Api.post = jest
      .fn()
      .mockResolvedValue({ data: 'Supplier product is updated' });
    const dispatch = jest.fn();
    await editProduct(mockValues, mockData)(dispatch);
    expect(setAlert).toHaveBeenCalledWith(
      'Supplier product is updated',
      'success'
    );
  });

  it('should call setAlert if no data is returned', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    Api.post = jest.fn().mockResolvedValue({});
    const dispatch = jest.fn();
    await editProduct(mockValues, mockData)(dispatch);
    expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
  });

  it('should call DFnewLogger and CatchError if an error occurs', async () => {
    const mockValues = { values: 'mockValues' };
    const mockData = { data: 'mockData' };
    const mockError = new Error('mockError');
    Api.post = jest.fn().mockRejectedValue(mockError);
    const dispatch = jest.fn();
    await editProduct(mockValues, mockData)(dispatch);
    expect(DFnewLogger).toHaveBeenCalledWith(mockError);
    expect(CatchError).toHaveBeenCalledWith(mockError);
  });
});
