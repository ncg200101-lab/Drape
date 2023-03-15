import Api from 'utils/Api';
import { setAlert } from '../alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  VERIFY_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from '../types';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';

describe('auth actions', () => {
  it('should load user', async () => {
    const res = await Api.get('/user/uinfo');
    expect(res.data).toBeDefined();
  });

  it('should signup user', async () => {
    const formData = {};
    const res = await Api.post('/user/signup', formData);
    expect(res.data).toBeDefined();
  });

  it('should verify user', async () => {
    const formData = {};
    const res = await Api.post('/user/verify', formData);
    expect(res.data).toBeDefined();
  });

  it('should login user', async () => {
    const formData = {};
    const res = await Api.post('/user/login', formData);
    expect(res.data).toBeDefined();
  });

  it('should forgot password', async () => {
    const formData = {};
    const res = await Api.post('/user/forgotpwd', formData);
    expect(res.data).toBeDefined();
  });

  it('should reset password', async () => {
    const formData = {};
    const res = await Api.post('/user/resetpwd', formData);
    expect(res.data).toBeDefined();
  });

  it('should edit login details', async () => {
    const formData = {};
    const res = await Api.post('/user/logindetails/edit', formData);
    expect(res.data).toBeDefined();
  });

  it('should logout user', async () => {
    const res = await Api.post('/user/logout');
    expect(res.data).toBeDefined();
  });
});
