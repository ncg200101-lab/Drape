import { useSelector } from 'react-redux';
import { Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Tabs } from 'antd';
//-- component
import NavTabs from '../component/profile/NavTabs';
import Total from './Total';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChild } from '@fortawesome/free-solid-svg-icons';
import { FirstUpper } from 'utils/FirstUpper';

const Account = () => {
  //-- hooks
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state) => state.auth);
  //-- params
  let family = [`${FirstUpper(user?.firstName)}`];
  user?.kids?.forEach((item) => family.push(`${item.name}`));
  const wmItems = [
    'Overview',
    'Login details',
    'Your Address',
    'Payment details',
    'Manage FIT settings',
    'Account Credit',
    'Email preferences',
    'Manage Facebook Settings',
    'Manage Contact Settings'
  ];
  const gbItems = ['Manage FIT settings', 'Email preference'];

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid container className="account">
        <Grid item xs={12}>
          <Tabs
            type="card"
            className="person-list"
            items={family.map((item, index) => {
              return {
                label:
                  index === 0 ? (
                    <span>
                      <FontAwesomeIcon icon={faUserCircle} /> {item}
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faChild} /> {item}
                    </span>
                  ),
                key: index,
                children:
                  index === 0 ? (
                    <>
                      <Divider />
                      <Tabs
                        tabPosition={matchDownMD ? 'top' : 'left'}
                        style={{
                          width: '100%',
                          color: '#232f3e'
                        }}
                        items={wmItems.map((item, index) => {
                          return {
                            label: item,
                            key: index,
                            children: (
                              <Total className="account-info" value={index} />
                            )
                          };
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Divider />
                      <Tabs
                        tabPosition={matchDownMD ? 'top' : 'left'}
                        style={{
                          width: '100%',
                          color: '#232f3e'
                        }}
                        items={gbItems.map((item, index) => {
                          return {
                            label: item,
                            key: index,
                            children: <Total value={index * 2 + 4} />
                            /**
                             * need only 4th and 6th components in Total.
                             */
                          };
                        })}
                      />
                    </>
                  )
              };
            })}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
