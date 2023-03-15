import Api from './Api';
import MyEnvConfig from 'configs/MyEnvConfig';
import DFnewLogger from './DFnewLogger';

//-- store our JWT in LS and set axios headers if we do have a token
const SetAuthToken = (token) => {
  try {
    if (token) {
      Api.defaults.headers.common[
        'df-auth-token'
      ] = `${MyEnvConfig.bearer.tokenPrefix} ${token}`;
      localStorage.setItem('dftoken', token);
    } else {
      delete Api.defaults.headers.common['df-auth-token'];
      localStorage.removeItem('dftoken');
    }
  } catch (e) {
    DFnewLogger(e);
  }
};

export default SetAuthToken;
