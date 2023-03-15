import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';
import GlobalEnv from 'configs/GlobalEnv';
import MyEnvConfig from 'configs/MyEnvConfig';
import DFnewLogger from './DFnewLogger';

describe('Api', () => {
  let baseurl;
  let Api;

  beforeEach(() => {
    baseurl = GlobalEnv.isDebug
      ? `${MyEnvConfig.baseurl.dev}/dfnew`
      : `${MyEnvConfig.baseurl.prod}/dfnew`;

    Api = axios.create({
      baseURL: baseurl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  it('should create an instance of axios', () => {
    expect(Api).toBeInstanceOf(axios);
  });

  it('should have the correct base url', () => {
    expect(Api.defaults.baseURL).toEqual(baseurl);
  });

  it('should dispatch a logout action when response status is 401', () => {
    const spy = jest.spyOn(store, 'dispatch');
    Api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401) {
          store.dispatch({ type: LOGOUT });
        }
        return Promise.reject(err);
      }
    );

    Api.interceptors.response.handlers[1]({ response: { status: 401 } });
    expect(spy).toHaveBeenCalledWith({ type: LOGOUT });
  });
});
