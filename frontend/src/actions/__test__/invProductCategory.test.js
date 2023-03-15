import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { INV_GET_PRODUCT_CATEGORY, INV_EDIT_PRODUCT_CATEGORY } from './types';

describe('Product Category Actions', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('getProductCategory', () => {
    it('should call the getProductCategory action with the correct parameters', async () => {
      const data = {};
      const res = { data: {} };
      Api.post = jest.fn().mockResolvedValue(res);
      await getProductCategory(data)(dispatch);
      expect(Api.post).toHaveBeenCalledWith(
        '/adminventory/manage/product/category/tbllist',
        data
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: INV_GET_PRODUCT_CATEGORY,
        payload: res.data
      });
    });

    it('should call the setAlert action if there is no data in the response', async () => {
      const data = {};
      const res = {};
      Api.post = jest.fn().mockResolvedValue(res);
      await getProductCategory(data)(dispatch);
      expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
    });

    it('should call the CatchError and DFnewLogger actions if there is an error', async () => {
      const data = {};
      const err = new Error('Test Error');
      Api.post = jest.fn().mockRejectedValue(err);
      await getProductCategory(data)(dispatch);
      expect(DFnewLogger).toHaveBeenCalledWith(err);
      expect(CatchError).toHaveBeenCalledWith(err);
    });
  });

  describe('addProductCategory', () => {
    it('should call the addProductCategory action with the correct parameters', async () => {
      const values = {};
      const data = {};
      const res = { data: {} };
      Api.post = jest.fn().mockResolvedValue(res);
      await addProductCategory(values, data)(dispatch);
      expect(Api.post).toHaveBeenCalledWith(
        '/adminventory/manage/product/category/add',
        values
      );
      expect(setAlert).toHaveBeenCalledWith(
        'Product category is added',
        'success'
      );
      expect(dispatch).toHaveBeenCalledWith(getProductCategory(data));
    });

    it('should call the setAlert action if there is no data in the response', async () => {
      const values = {};
      const data = {};
      const res = {};
      Api.post = jest.fn().mockResolvedValue(res);
      await addProductCategory(values, data)(dispatch);
      expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
    });

    it('should call the CatchError and DFnewLogger actions if there is an error', async () => {
      const values = {};
      const data = {};
      const err = new Error('Test Error');
      Api.post = jest.fn().mockRejectedValue(err);
      await addProductCategory(values, data)(dispatch);
      expect(DFnewLogger).toHaveBeenCalledWith(err);
      expect(CatchError).toHaveBeenCalledWith(err);
    });
  });

  describe('editProductCategory', () => {
    it('should call the editProductCategory action with the correct parameters', async () => {
      const values = {};
      const res = { data: {} };
      Api.post = jest.fn().mockResolvedValue(res);
      await editProductCategory(values)(dispatch);
      expect(Api.post).toHaveBeenCalledWith(
        '/adminventory/manage/product/category/edit',
        values
      );
      expect(setAlert).toHaveBeenCalledWith(
        'Product category is updated',
        'success'
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: INV_EDIT_PRODUCT_CATEGORY,
        payload: res.data
      });
    });

    it('should call the setAlert action if there is no data in the response', async () => {
      const values = {};
      const res = {};
      Api.post = jest.fn().mockResolvedValue(res);
      await editProductCategory(values)(dispatch);
      expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
    });

    it('should call the CatchError and DFnewLogger actions if there is an error', async () => {
      const values = {};
      const err = new Error('Test Error');
      Api.post = jest.fn().mockRejectedValue(err);
      await editProductCategory(values)(dispatch);
      expect(DFnewLogger).toHaveBeenCalledWith(err);
      expect(CatchError).toHaveBeenCalledWith(err);
    });
  });

  describe('deleteProductCategory', () => {
    it('should call the deleteProductCategory action with the correct parameters', async () => {
      const values = {};
      const data = {};
      const res = { data: 'Product category is deleted' };
      Api.post = jest.fn().mockResolvedValue(res);
      await deleteProductCategory(values, data)(dispatch);
      expect(Api.post).toHaveBeenCalledWith(
        '/adminventory/manage/product/category/delete',
        values
      );
      expect(setAlert).toHaveBeenCalledWith(res.data, 'success');
      expect(dispatch).toHaveBeenCalledWith(getProductCategory(data));
    });

    it('should call the setAlert action if there is no data in the response', async () => {
      const values = {};
      const data = {};
      const res = {};
      Api.post = jest.fn().mockResolvedValue(res);
      await deleteProductCategory(values, data)(dispatch);
      expect(setAlert).toHaveBeenCalledWith('Something went wrong', 'error');
    });

    it('should call the CatchError and DFnewLogger actions if there is an error', async () => {
      const values = {};
      const data = {};
      const err = new Error('Test Error');
      Api.post = jest.fn().mockRejectedValue(err);
      await deleteProductCategory(values, data)(dispatch);
      expect(DFnewLogger).toHaveBeenCalledWith(err);
      expect(CatchError).toHaveBeenCalledWith(err);
    });
  });
});
