import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from '../utils/Api';
import { setAlert } from './alert';
import { GET_INFLUENCER, EDIT_INFLUENCER } from './types';

describe('Influencer Actions', () => {
  let data;
  let values;
  let res;

  beforeEach(() => {
    data = {};
    values = {};
    res = {
      data: 'Influencer entity is deleted'
    };
  });

  describe('getInfluencer', () => {
    it('should dispatch GET_INFLUENCER action when successful', async () => {
      const spy = jest.spyOn(Api, 'post').mockResolvedValueOnce(res);
      const dispatch = jest.fn();
      await getInfluencer(data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/tbllist',
        data
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_INFLUENCER,
        payload: res.data
      });
    });

    it('should call setAlert with error message when unsuccessful', async () => {
      const spy = jest.spyOn(Api, 'post').mockRejectedValueOnce(new Error());
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await getInfluencer(data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/tbllist',
        data
      );
      expect(dispatch).not.toHaveBeenCalled();
      expect(setAlertSpy).toHaveBeenCalledWith('Something went wrong', 'error');
    });
  });

  describe('addInfluencer', () => {
    it('should dispatch GET_INFLUENCER action when successful', async () => {
      res.data = 'Influencer is created';
      const spy = jest.spyOn(Api, 'post').mockResolvedValueOnce(res);
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await addInfluencer(values, data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/create',
        values
      );
      expect(dispatch).toHaveBeenCalledWith(getInfluencer(data));
      expect(setAlertSpy).toHaveBeenCalledWith(res.data, 'success');
    });

    it('should call setAlert with error message when unsuccessful', async () => {
      const spy = jest.spyOn(Api, 'post').mockRejectedValueOnce(new Error());
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await addInfluencer(values, data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/create',
        values
      );
      expect(dispatch).not.toHaveBeenCalled();
      expect(setAlertSpy).toHaveBeenCalledWith('Something went wrong', 'error');
    });
  });

  describe('editInfluencer', () => {
    it('should dispatch EDIT_INFLUENCER action when successful', async () => {
      const spy = jest.spyOn(Api, 'post').mockResolvedValueOnce(res);
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await editInfluencer(values)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/edit',
        values
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: EDIT_INFLUENCER,
        payload: res.data
      });
      expect(setAlertSpy).toHaveBeenCalledWith(
        'Influencer info is updated',
        'success'
      );
    });

    it('should call setAlert with error message when unsuccessful', async () => {
      const spy = jest.spyOn(Api, 'post').mockRejectedValueOnce(new Error());
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await editInfluencer(values)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/edit',
        values
      );
      expect(dispatch).not.toHaveBeenCalled();
      expect(setAlertSpy).toHaveBeenCalledWith('Something went wrong', 'error');
    });
  });

  describe('deleteInfluencer', () => {
    it('should dispatch GET_INFLUENCER action when successful', async () => {
      const spy = jest.spyOn(Api, 'post').mockResolvedValueOnce(res);
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await deleteInfluencer(values, data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/delete',
        values
      );
      expect(dispatch).toHaveBeenCalledWith(getInfluencer(data));
      expect(setAlertSpy).toHaveBeenCalledWith(
        'Influencer info is deleted',
        'success'
      );
    });

    it('should call setAlert with error message when unsuccessful', async () => {
      const spy = jest.spyOn(Api, 'post').mockRejectedValueOnce(new Error());
      const dispatch = jest.fn();
      const setAlertSpy = jest.spyOn(setAlert, 'setAlert');
      await deleteInfluencer(values, data)(dispatch);
      expect(spy).toHaveBeenCalledWith(
        '/admmain/manage/influencer/delete',
        values
      );
      expect(dispatch).not.toHaveBeenCalled();
      expect(setAlertSpy).toHaveBeenCalledWith('Something went wrong', 'error');
    });
  });
});
