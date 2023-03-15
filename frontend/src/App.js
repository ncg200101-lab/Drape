import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import { FloatButton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import LoadingOverlay from 'react-loading-overlay-ts';

import ThemeRoutes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
//-- redux
import store from 'store';
import { LOGOUT } from './actions/types';
import { loadUser } from './actions/auth';
import SetAuthToken from './utils/SetAuthToken';
import DFnewLogger from 'utils/DFnewLogger';
import AddToCard from './views/client/profile/AddCard';

const App = () => {
  const [loadingFlag, setLoadingFlag] = useState(true);
  const simulateRequest = () => {
    const timeout = 100; // * 0.1s
    return new Promise((resolve) => setTimeout(() => resolve(), timeout));
  };

  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    simulateRequest().then(() => {
      const bodyElm = document.querySelector('body');
      const loaderElm = document.querySelector('.loader-container');
      if (loaderElm) {
        loaderElm.remove();
        bodyElm.style.backgroundColor = 'unset';
        setLoadingFlag(!loadingFlag);
      }
    });

    DFnewLogger('Initialize App...');
    //-- check for token in LS when app first runs
    if (localStorage.dftoken) {
      //-- if there is a token, set axios headers for all requests
      SetAuthToken(localStorage.dftoken);
    }
    //-- try to fetch a user, if no token or invalid token
    //-- we will get a 401 response from our API
    store.dispatch(loadUser());
    //-- log user out from all tabs if they log out in one browser tab
    window.addEventListener('storage', () => {
      if (!localStorage.dftoken) store.dispatch({ type: LOGOUT });
    });
  }, [loadingFlag]);

  const arrowUP = (
    <FontAwesomeIcon icon={faChevronUp} style={{ fontWeight: '900' }} />
  );

  if (loadingFlag) {
    return null; // *
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <FloatButton.BackTop
            icon={arrowUP}
            style={{ backgroundColor: '#232f3e', zIndex: '9999' }}
          />
          <LoadingOverlay
            active={customization.isLoading}
            spinner
            styles={{
              overlay: (base) => ({
                ...base,
                zIndex: '10000'
              }),
              spinner: (base) => ({
                ...base,
                position: 'fixed',
                bottom: '50vh'
              })
            }}
          >
            <AddToCard />
          </LoadingOverlay>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
